import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController{
  constructor(private createUserUseCase: CreateUserUseCase){}
  async handle(request: Request, response: Response): Promise<Response>{
    const { email, phone, fullname, username, password, bio} = request.body;
    const profile_img_path = request.file?.filename || null;

    await this.createUserUseCase.execute({email, phone, fullname, username, password, bio,profile_img_path});
    return response.status(201).json();
  }
}
export { CreateUserController};