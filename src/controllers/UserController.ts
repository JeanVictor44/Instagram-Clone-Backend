import { Request, Response } from 'express';
import { isEmailValid } from '../helpers/isEmailValid';
import { verifyPassword } from '../helpers/verifyPassword';
import { compare, hash } from 'bcryptjs';
import UsersRepository from '../repositories/Users/UsersRepository';
import { prismaClient } from '../database/primaClient';


class UserController {


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