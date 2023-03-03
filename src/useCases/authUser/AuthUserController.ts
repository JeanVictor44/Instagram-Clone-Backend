import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthUserUseCase } from './AuthUserUseCase';

class AuthUserController {
  async handle(request: Request, response: Response){
    const { email, password } = request.body;
    
    const authUserUseCase = container.resolve(AuthUserUseCase);
    const userAuth = await authUserUseCase.execute({email,password});
    
    return response.status(200).send(userAuth);
  }
}

export { AuthUserController };