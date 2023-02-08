export interface VerificationPassword {
    strength:'Fraco' | 'Médio' | 'Forte' 
    tip?: string
}

//Verificar individualmente maiúsculas e minúsculas

export function verifyPassword(password: string):VerificationPassword {
  if(password.length >= 8 && password.length <= 15){
    const numbers = /[0-9]/;
    const alphabet = /[a-z]/;
    const specialCharacters = /[~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<]/;
    
    const haveNumbers = password.match(numbers);
    const haveSpecialCharacters = password.match(specialCharacters);
    const haveAlphabet = password.match(alphabet);

    if(!(haveNumbers && haveAlphabet)){
      return {
        strength: 'Fraco',
        tip: 'insira números e letras'
      };
    }
    if(!haveNumbers){
      return {
        strength: 'Médio',
        tip: 'insira números'
      };
    }
    if(!haveAlphabet){
      return {
        strength: 'Fraco',
        tip: 'insira letras'
      };
    }

    if(!haveSpecialCharacters){
      return {
        strength: 'Médio',
        tip: 'insira caracteres especiais'
      };
    }

    return {
      strength: 'Forte',
    };

  }else {
    return {
      strength: 'Fraco',
      tip: 'insira no mínimo 8 caracteres e no máximo 12'
    };
  }


}