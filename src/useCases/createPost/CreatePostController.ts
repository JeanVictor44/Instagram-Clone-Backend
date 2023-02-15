import { Request, Response } from 'express';
import { CreatePostUseCase } from './CreatePostUseCase';

class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase){}

  handle(request: Request, response: Response){
    const { userId } = request;
    const { caption, location, likes} = request.body; 
    const image_path = request.file?.filename as string;

    this.createPostUseCase.execute({
      author_id:userId,
      caption,
      location,
      likes,
      post_img_path: image_path
    });

    return response.status(201).json();
  }
}

export { CreatePostController };