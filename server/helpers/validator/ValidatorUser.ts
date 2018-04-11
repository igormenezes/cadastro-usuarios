import { ValidatorInterface } from "./validatorInterface";

export class ValidatorUser implements ValidatorInterface{
    public messages: any;
    public fieldsErrors: Array<String> = [];

    constructor(){
        this.messages = {
            'email': 'E-mail inválido!', 
            'password': 'Password Inválido (Min: 6 caracteres)',
            'type': 'Selecione o tipo de usuário'
        };
    }

    public validate(req: any){
        req.check('email', this.messages.email).isEmail();
        req.check('password', this.messages.password).isLength({min: 6});
        req.check('type', this.messages.type).notEmpty();

        let errors = req.validationErrors();

        if(errors){
            errors.forEach((error: any) => {
                console.log(error);
                this.fieldsErrors.push(error.msg);
            });

            return this.fieldsErrors;
        }

        return false;
    }
}