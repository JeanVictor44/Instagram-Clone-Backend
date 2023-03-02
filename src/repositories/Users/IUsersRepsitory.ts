import { Prisma, User as UserPrisma} from '@prisma/client';
import { User } from '../../models/User';


export type ICreateUserDTO = Omit<UserPrisma, 'id'>

export interface IUsersRepository {
    create({bio, email, fullname, password, phone, profile_img_path, username}: ICreateUserDTO):Promise<void>
    delete(id: string): Promise<void>;
    update(id: string, userData: Omit<User,'id'>): Promise<void>;
    findUserById(id: string, needPassword: boolean):Promise<User>;
    findUserByEmail(emaiL: string):Promise<User>;
    findUserByPhone(phone: string):Promise<User>;
    findUserByUsername(username: string):Promise<User>;
    follow(userId: string,followId:string): Promise<User>
}