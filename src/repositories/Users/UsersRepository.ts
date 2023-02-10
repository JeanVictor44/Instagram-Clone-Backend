import {  User} from '@prisma/client';
import { prismaClient } from '../../database/primaClient';
import { IUsersRepository } from './IUsersRepsitory';

class UsersRepository implements IUsersRepository{
  findUserById(id: string, needPassword: boolean){
    return prismaClient.user.findUnique({
      where: {
        id
      },
      select: {
        email: true,
        fullname: true,
        username: true,
        bio: true,
        phone: true,
        profile_img_path: true,
        posts: true,
        password: needPassword,
        followers: {
          orderBy: {
            following: {
              username: 'asc',
            },
          },
          select: {
            following: true,
            
          }

        },
        following: {
          orderBy: {
            follower: {
              username: 'asc'
            } 
          },
          select: {
            follower: true
          },
        },
      },

      
      
    });
  }
  
  create(user: Omit<User,'id'>){
    return prismaClient.user.create({
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
  
  update(id: string, userData: Omit<User,'id'>){
    return prismaClient.user.update({
      where:{
        id
      },
      data: userData
    });
  }

  delete(id: string){
    return prismaClient.user.delete({
      where: {
        id
      }
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