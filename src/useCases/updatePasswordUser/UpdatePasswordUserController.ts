import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePasswordUserUseCase } from './UpdatePasswordUserUseCase';

class UpdatePasswordUserController {
  async handle(request: Request, response: Response){
    const { id } = request.params;
    const { oldPassword, newPassword } = request.body;

    const updatePasswordUserUseCase = container.resolve(UpdatePasswordUserUseCase);

    await updatePasswordUserUseCase.execute({id, newPassword, oldPassword});
    
    response.status(200).send(); 
  }
}

export { UpdatePasswordUserController };