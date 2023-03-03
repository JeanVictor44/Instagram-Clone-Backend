import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}
}