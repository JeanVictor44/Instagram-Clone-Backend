import { Request, Response } from 'express';
import { prismaClient } from '../database/primaClient';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
require('dotenv').config();

class AuthController {
  async authenticate(request: Request, response: Response){
    const { email, phone, username, password } = request.body;

    const user = await prismaClient.user.findUnique({
      where:{
        email
      }
    });
  
    if(!user){
      return response.status(400).json({error: 'Usuário não encontrado'}); 
    }

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    
    if(!isPasswordsMatch){
      return response.status(400).json({error: 'Senha incorreta'}); 
    }
    const SECRET_KEY_WEB_TOKEN = process.env.SECRET_KEY_WEB_TOKEN as string;
    const token = sign({id: user.id}, SECRET_KEY_WEB_TOKEN, {expiresIn: '1d'});

    const { id } = user;

    
    return response.json({user: {id, email},token});
  }
}

export default new AuthController();