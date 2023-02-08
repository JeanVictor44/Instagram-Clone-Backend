import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
    create(user: Omit<User,'id'>):Prisma.Prisma__UserClient<User, never>;
    delete(id: string): Prisma.Prisma__UserClient<User, never>;
    update(id: string, userData: Omit<User,'id'>): Prisma.Prisma__UserClient<User>;
    findUserById(id: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByEmail(emaiL: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByPhone(phone: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByUsername(username: string):Prisma.Prisma__UserClient<User | null, null>;
    
}