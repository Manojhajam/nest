import { Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'sequelize-typescript';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: 'John Doe', age: 20 },
        { id: 2, name: 'Jane Smith', age: 22 },
        { id: 3, name: 'Michael Johnson', age: 19 },
    ];

    getAllStudents() {
        return this.students;
    }

    getStudentById(id: number) {
        const student = this.students.find(s => s.id === id);
        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        return student;
    }

    createStudent(data: { name: string; age: number }) {
        const newStudent = { id: this.students.length + 1, ...data };
        this.students.push(newStudent);
        return newStudent;
    }

    //PUT
    updateStudent(id: number, data: { name: string; age: number }) {
        const studentIndex = this.students.findIndex(s => s.id === id);
        if (studentIndex === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        this.students[studentIndex] = { id, ...data };
        return this.students[studentIndex];
    }

    //PATCH
    patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
        const student = this.getStudentById(id);
        Object.assign(student, data);
        return student;
    }

    deleteStudent(id: number) {
        const index = this.students.findIndex(s => s.id === id);
        if (index === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }
        this.students.splice(index, 1);
        return { message: `Student with id ${id} deleted successfully` };
    }
}
