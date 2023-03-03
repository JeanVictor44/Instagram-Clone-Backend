import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FollowUserUseCase } from './FollowUserUseCase';

class FolloUserController {
  async handle(request: Request, response: Response){
    const { userId } = request;
    const { followId } = request.params;
    
    const followUserUseCase = container.resolve(FollowUserUseCase);
    
    const user = await followUserUseCase.execute({followId, userId});
    return response.status(200).send(user);
  } 
}

export { FolloUserController };