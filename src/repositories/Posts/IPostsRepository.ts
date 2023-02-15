import { Post } from '../../models/Post';

export type ICreatePostDTO = Omit <Post, 'id'>
export interface IPostsRepository {
  create({author_id,caption,likes,location,post_img_path}: ICreatePostDTO):void
}