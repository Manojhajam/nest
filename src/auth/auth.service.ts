import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../user/entities/user.entity';
import { RegisterDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_REPOSITORY') private userRepository: typeof Users,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({ where: { email: registerDto.email } });

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.userRepository.create({ ...registerDto, password: hashedPassword } as unknown as Users);

        return {
            message: 'User registered successfully',
            user,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException(
                'Invalid email or password',
            );
        }

        const userJson = user.toJSON();

        const isPasswordMatched =
            await bcrypt.compare(
                password,
                userJson.password,
            );

        if (!isPasswordMatched) {
            throw new UnauthorizedException(
                'Invalid email or password',
            );
        }

        const payload = {
            id: userJson.id,
            email: userJson.email,
        };

        const access_token =
            this.jwtService.sign(payload);

        return {
            message: 'Login successful',
            access_token,
        };
    }

}
