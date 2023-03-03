import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

@injectable()
class ShowUserUseCase {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
  ){}
  async execute(id: string){
    const user = await this.usersRepository.findUserById(id, false);
    if(!user){
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
}

export { ShowUserUseCase };