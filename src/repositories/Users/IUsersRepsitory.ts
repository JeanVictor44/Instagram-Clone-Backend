import { Prisma, User as UserPrisma} from '@prisma/client';
import { User } from '../../models/User';


export type ICreateUserDTO = Omit<UserPrisma, 'id'>

export interface IUsersRepository {
    create({bio, email, fullname, password, phone, profile_img_path, username}: ICreateUserDTO):void
    delete(id: string): Prisma.Prisma__UserClient<User, never>;
    update(id: string, userData: Omit<User,'id'>): Prisma.Prisma__UserClient<User>;
    findUserById(id: string, needPassword: boolean):User;
    findUserByEmail(emaiL: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByPhone(phone: string):Prisma.Prisma__UserClient<User | null, null>;
    findUserByUsername(username: string):Prisma.Prisma__UserClient<User | null, null>;
    
}