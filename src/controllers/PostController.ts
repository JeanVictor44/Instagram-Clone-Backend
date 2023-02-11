import { Request, Response } from 'express';
import PostsRepository  from '../repositories/Posts/PostsRepository';

class PostController {
  async store(request: Request, response: Response){
    const { userId } = request;
    const { caption, location, likes} = request.body; 
    const image_path = request.file?.filename as string;
    
    if(!image_path) {
      return response.status(400).json('Obrigatório uma imagem');
    }
    const post = await PostsRepository.create({
      author_id:userId,
      caption,
      location,
      likes: likes || 0,
      post_img_path: image_path
    }); 

    return response.json(post);
  }
}
export default new PostController();