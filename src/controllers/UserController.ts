import { Request, Response } from 'express';
import { isEmailValid } from '../helpers/isEmailValid';
import { verifyPassword } from '../helpers/verifyPassword';
import { hash } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';

class UserController {
  async store(request: Request, response: Response){
    const { email, phone, fullname, username, password } = request.body;

    // verificar se o usuário existe -> email, phone, username
    

    if(!(email || phone)){
      return response.status(400).json({error: 'Email ou Telefone é obrigatório'});
    }
    
    if(email) {
      const emailExists = await UsersRepository.findUserByEmail(email);
      
      if(emailExists) {
        return response.status(409).json({error: 'Email já existente'}); 
      }else {
        //Verificar se é válido
        if(!(await isEmailValid(email))){
          return response.status(400).json({error: 'Email inválido'});
        }
      }
    }else {
      const phoneExists = await UsersRepository.findUserByPhone(phone);
      
      if(phoneExists) {
        return response.status(409).json({error: 'Telefone já existente'}); 
      }else {
        console.log('verificar se é válido');
      }

    }
    
    if(!fullname){
      return response.status(400).json({error: 'Nome completo é obrigatório'});
    }

    if(!username){
      return response.status(400).json({error: 'Nome de usuário é obrigatório'});
    }else {
      const usernameExists = await UsersRepository.findUserByUsername(username);

      if(usernameExists) {
        return response.status(409).json({error: 'Nome de usuário já existente'}); 
      }else {
        console.log('verificar se é válido');
      }
    }

    if(!password){
      return response.status(400).json({error: 'Senha é obrigatório'});
    }
    const verificationPassword = verifyPassword(password);
    if(verificationPassword.strength != 'Forte'){
      return response.status(400).json({error: verificationPassword});
    }

    const hashPassword = await hash(password, 8);

    const user = await UsersRepository.create({
      email,
      fullname,
      password: hashPassword,
      phone,
      username
    });

    return response.json(user);
  }
}

export default new UserController();