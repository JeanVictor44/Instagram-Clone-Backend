import { Request, Response } from 'express';
import UsersRepository from '../repositories/Users/UsersRepository';

class FollowController {
  async follow(request: Request, response: Response){
    const { userId } = request;
    const { followId } = request.params;
    
    const follow = await UsersRepository.findUserById(followId,false);
    if(!follow){
      return response.status(400).json('Usuário a seguir não encontrado');
    }
    const user = await UsersRepository.follow(userId, followId);
    return response.json(user); 
  }
  // unfollow(request: Request, response: Response){

  // }
}

export default new FollowController();