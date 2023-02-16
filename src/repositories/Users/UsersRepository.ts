import {  Prisma, User as UserPrisma} from '@prisma/client';
import { prismaClient } from '../../database/primaClient';
import { User } from '../../models/User';
import { ICreateUserDTO, IUsersRepository } from './IUsersRepsitory';

class UsersRepository implements IUsersRepository{
  delete(id: string): Prisma.Prisma__UserClient<User, never> {
    throw new Error('Method not implemented.');
  }
  update(id: string, userData: Omit<User, 'id'>): Prisma.Prisma__UserClient<User, never> {
    throw new Error('Method not implemented.');
  }
  findUserById(id: string, needPassword: boolean): User {
    throw new Error('Method not implemented.');
  }
  findUserByEmail(emaiL: string): Prisma.Prisma__UserClient<User, null> {
    throw new Error('Method not implemented.');
  }
  findUserByPhone(phone: string): Prisma.Prisma__UserClient<User, null> {
    throw new Error('Method not implemented.');
  }
  findUserByUsername(username: string): Prisma.Prisma__UserClient<User, null> {
    throw new Error('Method not implemented.');
  }
  // findUserById(id: string, needPassword: boolean){
  //   return prismaClient.user.findUnique({
  //     where: {
  //       id
  //     },
  //     select: {
  //       email: true,
  //       fullname: true,
  //       username: true,
  //       bio: true,
  //       phone: true,
  //       profile_img_path: true,
  //       posts: true,
  //       password: needPassword,
  //       followers: {
  //         orderBy: {
  //           following: {
  //             username: 'asc',
  //           },
  //         },
  //         select: {
  //           following: true,
            
  //         }

  //       },
  //       following: {
  //         orderBy: {
  //           follower: {
  //             username: 'asc'
  //           } 
  //         },
  //         select: {
  //           follower: true
  //         },
  //       },
  //     },

      
      
  //   });
  // }
  
  async create({bio,email,fullname,password,phone,profile_img_path,username}: ICreateUserDTO){
    const user = new User();
    
    Object.assign(user, {
      bio,
      email,
      fullname,
      password,
      phone,
      profile_img_path,
      username
    });
    
    await prismaClient.user.create({
      data: user
    });
  }

  follow(userId:string, followId: string){
    return prismaClient.user.update({
      where: {
        id: userId
      },
      data: {
        following: {
          create: {
            followerId: followId
          }
        }
      }
    });
  }
  
  // update(id: string, userData: Omit<User,'id'>){
  //   return prismaClient.user.update({
  //     where:{
  //       id
  //     },
  //     data: userData
  //   });
  // }

  // delete(id: string){
  //   return prismaClient.user.delete({
  //     where: {
  //       id
  //     }
  //   });
  // }

  // findUserByEmail(email: string){
  //   return prismaClient.user.findUnique({
  //     where:{
  //       email
  //     }
  //   });
  // }

  // findUserByPhone(phone: string){
  //   return prismaClient.user.findUnique({
  //     where:{
  //       phone
  //     }
  //   });

  // }

  // findUserByUsername(username: string){
  //   return prismaClient.user.findUnique({
  //     where:{
  //       username
  //     }
  //   });
  // }
}

export {UsersRepository };