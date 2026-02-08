import { Role } from "../generated/prisma/client";
declare global {
    namespace Express {
        interface User {
            userId: number;
            username: string;
            name: string;
            password: string;
            role: Role;
        }
    }
}

export {};