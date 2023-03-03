import bcrypt from 'bcryptjs';
import { isEmailValid } from '../../helpers/isEmailValid';
import { verifyPassword } from '../../helpers/verifyPassword';
import { ICreateUserDTO, IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository){}
  async execute({bio,email,fullname,password,phone,profile_img_path,username}: ICreateUserDTO){

    if(!(email || phone)){
      throw new Error('Email ou Telefone é obrigatório');
    }
    
    if(email) {
      const emailExists = this.usersRepository.findUserByEmail(email);
      
      if(emailExists) {
        throw new Error('Email já existente'); 
      }else {
        //Verificar se é válido
        if(!(await isEmailValid(email))){
          throw new Error('Email inválido');
        }
      }
    }else {
      const phoneExists = await this.usersRepository.findUserByPhone(phone);
      
      if(phoneExists) { 
        throw new Error('Telefone já existente');
      }else {
        console.log('verificar se é válido');
      }

    }
    
    if(!fullname){
      throw new Error('Nome completo é obrigatório');
    }

    if(!username){
      throw new Error('Nome de usuário é obrigatório');
    }else {
      const usernameExists = await this.usersRepository.findUserByUsername(username);
      if(usernameExists) {
        throw new Error('Nome de usuário já existente'); 
      }else {
        console.log('verificar se é válido');
      }
    }

    if(!password){
      throw new Error('Senha é obrigatório');
    }
    const verificationPassword = verifyPassword(password);
    if(verificationPassword.strength != 'Forte'){
      throw new Error('Senha Fraca');
    }

    const hashPassword = await bcrypt.hash(password, 8);

    await this.usersRepository.create({bio, email, fullname, password: hashPassword, phone, profile_img_path, username});
  }
}


export { CreateUserUseCase};