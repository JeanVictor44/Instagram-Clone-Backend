import {v4 as uuidV4 } from 'uuid';


class User {
  id: string;   
  email: string;
  phone: string; 
  fullname: string;
  username: string;
  bio: string;
  profile_img_path?:string; 
  password: string;

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}
export { User };