import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    async getAllCustomers(): Promise<Customer[]> {
        return Customer.findAll();
    }

    async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        return Customer.create(
            createCustomerDto as any,
        );
    }
}