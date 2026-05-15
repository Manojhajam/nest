import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USERS_REPOSITORY') private userRepository: typeof Users) { }

  async createUser(registerDto: RegisterDto) {
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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
