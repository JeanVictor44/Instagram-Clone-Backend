import { AbstractAPI } from '../api/abstract';

interface IAbstractAPI {
  deliverability: 'DELIVERABLE' | 'UNDELIVERABLE'
}

export async function isEmailValid(email: string){
  const emailInformation = (await AbstractAPI.get(`?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`)).data as IAbstractAPI;
  return emailInformation.deliverability === 'DELIVERABLE' ? true : false;
}