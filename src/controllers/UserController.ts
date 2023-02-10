import { Request, Response } from 'express';
import { isEmailValid } from '../helpers/isEmailValid';
import { verifyPassword } from '../helpers/verifyPassword';
import { compare, hash } from 'bcryptjs';
import UsersRepository from '../repositories/Users/UsersRepository';
import { prismaClient } from '../database/primaClient';


class UserController {

  async show(request: Request, response: Response){
    const { id } = request.params;
    const user = await UsersRepository.findUserById(id, false);
    if(!user){
      return response.status(400).json({error: 'Usuário não encontrado'});
    }
    return response.json(user);

  }

  async updatePassword(request: Request, response: Response){
    const { id } = request.params;
    const { oldPassword, newPassword } = request.body;
    
    const user = await UsersRepository.findUserById(id, true);
    if(!user){
      return response.status(400).json({error: 'Usuário não encontrado'});
    }

    const isPasswordsMatch = await compare(oldPassword,user.password);
    if(!isPasswordsMatch){
      return response.status(400).json({error: 'Sua senha antiga foi inserida incorretamente.'});
    }

    const verificationPassword = verifyPassword(newPassword);
    if(verificationPassword.strength != 'Forte'){
      return response.status(400).json({error: verificationPassword});
    }

    const hashPassword = await hash(newPassword,8);

    await prismaClient.user.update({
      where: {
        id
      },
      data: {
        password: hashPassword
      }
    });

    return response.sendStatus(204);
  }

  async store(request: Request, response: Response){
    const { email, phone, fullname, username, password, bio} = request.body;

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

    const profile_img_path = request.file?.filename || null;
    console.log(profile_img_path);

    const user = await UsersRepository.create({
      email,
      fullname,
      password: hashPassword,
      phone,
      username,
      profile_img_path,
      bio

    });

    return response.json(user);
  }

  async delete(request: Request, response: Response){
    const { id } = request.params;
    const user = await UsersRepository.findUserById(id, false);
    if(!user) {
      return response.status(400).json({error: 'Usuário não encontrado'});
    }

    await UsersRepository.delete(id);

    return response.sendStatus(204);
  }

  async update(request: Request, response: Response){
    const { id } = request.params;
    const { email, phone, username, fullname, bio} = request.body;

    const user = await UsersRepository.findUserById(id, false);
    if(!user){
      return response.status(400).json({error: 'Usuário não encontrado'});
    }
    // Verificar se username, email e telefone já é usado / verificar email

    const profile_img_path = request.file?.filename || null;
    const userUpdateData = {
      email: email || user.email, 
      phone: phone || user.phone,
      username: username || user.username,
      fullname: fullname || user.fullname,
      password: user.password,
      profile_img_path: profile_img_path || user.profile_img_path,
      bio: bio || user.bio
    };

    await UsersRepository.update(id, userUpdateData);
    
    return response.sendStatus(204);
  }

  
}

export default new UserController();