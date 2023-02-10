import { Post, Prisma } from '@prisma/client';

export interface IPostsRepository {
    create(post: Omit<Post,'id'>):Prisma.Prisma__PostClient<Post, never>;
}