import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
    getGategories() {
        return ['Mobile', 'Laptop', 'Tablet'];
    }
}
