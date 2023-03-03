import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}
  async execute(id: string): Promise<void>{
    await this.usersRepository.delete(id);
    const user = this.usersRepository.findUserById(id, false);

    if(!user) {
      throw new Error('Usuário não encontrado');
    }
    await this.usersRepository.delete(id);
  }
}
export { DeleteUserUseCase };