import {v4 as uuidV4 } from 'uuid';
class Post{
  id?: string;
  caption: string;
  location: string;
  likes: number;
  post_img_path: string;
  author_id: string;
  constructor(){
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}
export { Post };