import { User } from '@prisma/client';
import { prismaClient } from '../database/primaClient';
import { IUsersRepository } from './IUsersRepsitory';

class UsersRepository implements IUsersRepository{
  
  create(user: Omit<User,'id'>){
    return prismaClient.user.create({
      data: user
    });
  }

  findUserByEmail(email: string){
    return prismaClient.user.findUnique({
      where:{
        email
      }
    });
  }

  findUserByPhone(phone: string){
    return prismaClient.user.findUnique({
      where:{
        phone
      }
    });

  }

  findUserByUsername(username: string){
    return prismaClient.user.findUnique({
      where:{
        username
      }
    });
  }
}

export default new UsersRepository();