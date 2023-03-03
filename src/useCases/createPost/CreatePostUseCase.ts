import { inject, injectable } from 'tsyringe';
import { IPostsRepository } from '../../repositories/Posts/IPostsRepository';

interface IRequest {
  caption: string;
  location: string;
  likes: number;
  post_img_path: string;
  author_id: string;
}

@injectable()
class CreatePostUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ){}

  execute({author_id,caption,likes,location,post_img_path}: IRequest){
    if(!post_img_path) {
      throw new Error('Obrigatório uma imagem');
      
    }
    this.postsRepository.create({author_id,caption,likes,location,post_img_path});
  }
}

export { CreatePostUseCase };
