import bcrypt from 'bcryptjs';
import { ICreateUserDTO, IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

class CreateUserUseCase {
  constructor(private userRepository: IUsersRepository){}
  async execute({bio,email,fullname,password,phone,profile_img_path,username}: ICreateUserDTO){
    // Adicionar as regras de negócio
    const hashPassword = await bcrypt.hash(password, 8);

    await this.userRepository.create({bio, email, fullname, password: hashPassword, phone,profile_img_path,username});
  }
}


export { CreateUserUseCase};