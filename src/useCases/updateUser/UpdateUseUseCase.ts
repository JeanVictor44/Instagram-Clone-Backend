import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';


interface IRequest {
    id: string,
    email: string,
    phone: string,
    username: string,
    fullname: string,
    bio: string,
    profileImgPath: string
}

@injectable()
class UpdateUserUseCase {
  
  constructor(
    @inject('UsersRepository')
        private usersRepository: IUsersRepository
  ){}
  async execute({id,email, phone, username, fullname, bio, profileImgPath}: IRequest){
    const user = await this.usersRepository.findUserById(id, false);
    if(!user){
      throw new Error('Usuário não encontrado');
    }

    // Verificar se username, email e telefone já é usado / verificar email
    // Ideia: criar um middleware para fazer essas verificações

    const profile_img_path = profileImgPath || null;

    const userUpdateData = {
      email: email || user.email, 
      phone: phone || user.phone,
      username: username || user.username,
      fullname: fullname || user.fullname,
      password: user.password,
      profile_img_path: profile_img_path || user.profile_img_path,
      bio: bio || user.bio
    };

    await this.usersRepository.update(id, userUpdateData);
  }
}

export {UpdateUserUseCase };