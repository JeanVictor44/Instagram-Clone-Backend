import { AbstractAPI } from '../services/abstract';

interface AbstractAPI {
  deliverability: 'DELIVERABLE' | 'UNDELIVERABLE'
}

export async function isEmailValid(email: string){
  const emailInformation = (await AbstractAPI.get(`?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`)).data as AbstractAPI;
  return emailInformation.deliverability === 'DELIVERABLE' ? true : false;
}