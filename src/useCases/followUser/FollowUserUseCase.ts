import { inject, injectable } from 'tsyringe';
import { User } from '../../models/User';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

interface IRequest {
    userId: string,
    followId: string
}

@injectable()
class FollowUserUseCase {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
  ){}

  async execute({followId, userId}: IRequest): Promise<User>{
    const follow = await this.usersRepository.findUserById(followId,false);
    if(!follow){
      throw new Error('Usuário a seguir não encontrado');
    }
    const user = await this.usersRepository.follow(userId, followId);
    
    return user;
  }
}

export { FollowUserUseCase };