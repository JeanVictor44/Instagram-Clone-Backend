import { container } from 'tsyringe';
import { IPostsRepository } from '../../repositories/Posts/IPostsRepository';
import { PostsRepository } from '../../repositories/Posts/PostsRepository';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';
import { UsersRepository } from '../../repositories/Users/UsersRepository';

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);