import { prismaClient } from '../../database/primaClient';
import { IUsersRepository } from './IUsersRepsitory';
import { User } from '../../models/User';

class UsersRepository implements IUsersRepository{
  async findUserById(id: string, needPassword: boolean): Promise<User>{
    const user = await prismaClient.user.findUnique({
      where: {
        id
      },
      select: {
        id:true,
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
    return user;
  }
  
  async create(user: Omit<User,'id'>): Promise<void>{
    await prismaClient.user.create({
      data: user
    });
  }

  async follow(userId:string, followId: string): Promise<User>{
    const user = await prismaClient.user.update({
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
    return user;
  }
  
  async update(id: string, userData: Omit<User,'id'>){
    await prismaClient.user.update({
      where:{
        id
      },
      data: userData
    });
  }

  async delete(id: string){
    await prismaClient.user.delete({
      where: {
        id
      }
    });
  }

  async findUserByEmail(email: string){
    const user = await prismaClient.user.findUnique({
      where:{
        email
      }
    });
    return user;
  }

  async findUserByPhone(phone: string){
    const user = await prismaClient.user.findUnique({
      where:{
        phone
      }
    });
    return user;

  }

  async findUserByUsername(username: string){
    const user = await prismaClient.user.findUnique({
      where:{
        username
      }
    });
    return user;
  }
}

export default new UsersRepository();