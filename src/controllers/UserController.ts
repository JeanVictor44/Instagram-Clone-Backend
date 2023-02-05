import { Request, Response } from 'express';
import { prismaClient } from '../database/primaClient';

class UserController {
  async store(request: Request, response: Response){
    const { email, phone, fullname, username, password } = request.body;

  }
}

export default new UserController();