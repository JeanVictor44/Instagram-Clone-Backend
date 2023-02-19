import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
require('dotenv').config();

type TokenPayload = {
    id: string
}

export function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
){
  const { authorization } = request.headers;

  if(!authorization){
    return response.status(401).json({error: 'Token not provided'});
  }
  const [,token] = authorization.split(' ');

  try {
    const SECRET_KEY_WEB_TOKEN = process.env.SECRET_KEY_WEB_TOKEN as string;
    const decoded = verify(token, SECRET_KEY_WEB_TOKEN);
    const { id } = decoded as TokenPayload;
    request.userId = id;
    
    next();
  }catch(error){
    return response.status(401).json({error: 'Token invalid'});

  }
}