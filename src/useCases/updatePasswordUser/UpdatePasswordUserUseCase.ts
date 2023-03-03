import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { verifyPassword } from '../../helpers/verifyPassword';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

interface IRequest {
    id: string,
    oldPassword: string,
    newPassword: string
}

@injectable()
class UpdatePasswordUserUseCase {
  constructor( 
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({id, newPassword, oldPassword}: IRequest): Promise<void>{
    const user = await this.usersRepository.findUserById(id, true);    
    if(!user){
      throw new Error('Usuário não encontrado');
    }

    const isPasswordsMatch = await compare(oldPassword,user.password);
    if(!isPasswordsMatch){
      throw new Error('Sua senha antiga foi inserida incorretamente');
    }

    const verificationPassword = verifyPassword(newPassword);
    if(verificationPassword.strength != 'Forte'){
      throw new Error('Senha fraca');
    }

    const hashPassword = await hash(newPassword,8);

    await this.usersRepository.updatePassword(id,hashPassword);
  }
}

export { UpdatePasswordUserUseCase };