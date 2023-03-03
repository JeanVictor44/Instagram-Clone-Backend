import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUseUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response){
    const { id } = request.params;
    const { email, phone, username, fullname, bio} = request.body;
    const { filename: profileImgPath } = request.file;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({id,email,bio, fullname,phone,profileImgPath,username});
    return response.status(200).send();
  }
}

export { UpdateUserController };