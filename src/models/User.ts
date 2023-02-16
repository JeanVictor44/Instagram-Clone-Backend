import {v4 as uuidV4 } from 'uuid';
import { Follow } from './Follow';
import { Post } from './Post';

class User {
  id: string;   
  email: string;
  phone: string; 
  fullname: string;
  username: string;
  bio: string;
  profile_img_path?:string; 
  password: string;
  
  // followers?: Follow[]; 
  // following?: Follow[];
  // posts?: Post[];

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}
export { User };