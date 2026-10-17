import { Request } from "express";

export interface RequeteAuthentifiee extends Request {
    user: {sub:string, role: string}
}