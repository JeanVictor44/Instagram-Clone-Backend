import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController{
  constructor(private createUserUseCase: CreateUserUseCase){}
  handle(request: Request, response: Response): Response{
    const { email, phone, fullname, username, password, bio} = request.body;
    const profile_img_path = request.file?.filename || null;

    this.createUserUseCase.execute({email, phone, fullname, username, password, bio,profile_img_path});
    return response.status(201).json();
  }
}
export { CreateUserController};