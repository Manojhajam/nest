import { Request } from "express";

interface UserRequest extends Request {
    user?: any; // You can replace 'any' with a more specific type if you have one
}

export type { UserRequest };