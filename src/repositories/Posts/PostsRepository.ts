import { Post, Prisma } from '@prisma/client';
import { prismaClient } from '../../database/primaClient';
import { IPostsRepository } from './IPostsRepository'; 

class PostsRepository implements IPostsRepository{
  create(post: Omit<Post, 'id'>){
    return prismaClient.post.create({
      data: post
    });
  }

}
export default new PostsRepository();