import { prismaClient } from '../../database/primaClient';
import { Post } from '../../models/Post';
import { ICreatePostDTO, IPostsRepository } from './IPostsRepository'; 

class PostsRepository implements IPostsRepository{
  async create({author_id,caption,likes,location,post_img_path}: ICreatePostDTO){
    const post = new Post();
    Object.assign(post, { author_id, caption,likes,location, post_img_path});
    
    await prismaClient.post.create({
      data: post
    });
  }

}
export { PostsRepository };    