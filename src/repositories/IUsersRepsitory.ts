import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
    create(user: Omit<User,'id'>):Prisma.Prisma__UserClient<User, never>;
    findUserByEmail(emaiL: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByPhone(phone: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByUsername(username: string):Prisma.Prisma__UserClient<User | null, null>;
}