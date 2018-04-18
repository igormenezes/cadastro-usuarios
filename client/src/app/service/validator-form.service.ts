import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Injectable()
export class ValidatorFormService {
  form: FormGroup;
  messages: Object = {
    'email': 'E-mail inválido!',
    'password': 'Password Inválido (Min: 6 caracteres)',
    'type': 'Selecione o tipo de usuário'
  };

  constructor(private formBuilder: FormBuilder) { }

  validate(fieldsValidators: any, fieldsValues?: any): FormGroup {
    return this.form = this.formBuilder.group({
      'email': [fieldsValues ? fieldsValues.email : '', fieldsValidators.email ? [Validators.required, Validators.email] : ''],
      'password': [fieldsValues ? fieldsValues.password : '', fieldsValidators.password ? [Validators.required, Validators.minLength(6)] : ''],
      'type': [fieldsValues ? fieldsValues.type : '', fieldsValidators.type ? [Validators.required] : '']
    });
  }

}
