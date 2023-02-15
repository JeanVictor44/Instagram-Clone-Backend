import { PostsRepository } from '../../repositories/Posts/PostsRepository';
import { CreatePostController } from './CreatePostController';
import { CreatePostUseCase } from './CreatePostUseCase';

const postsRepository = new PostsRepository();
const createPostUseCase = new CreatePostUseCase(postsRepository);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostController};