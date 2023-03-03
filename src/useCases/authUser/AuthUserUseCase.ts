import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/Users/IUsersRepsitory';

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        id: string,
        email: string
    },
    token: string
}

@injectable()
class AuthUserUseCase{
  constructor(
        @inject('UserRepository')
        private userRepository: IUsersRepository
  ){}
  async execute({email, password}:IRequest): Promise<IResponse>{
    const user = await this.userRepository.findUserByEmail(email);
    if(!user){
      throw new Error('User not found');
    }

    const isPasswordMatch = await compare(password, user.password);
    if(!isPasswordMatch) {
      throw new Error('Password incorrect');
    }
    const SECRET_KEY_WEB_TOKEN = process.env.SECRET_KEY_WEB_TOKEN as string;
    const token = sign({id: user.id},SECRET_KEY_WEB_TOKEN, {expiresIn: '1d'});
    
    const userAuth: IResponse = {
      user: {
        id: user.id,
        email
      },
      token
    };

    return userAuth;
  }
}

export { AuthUserUseCase };