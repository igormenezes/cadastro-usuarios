import { ValidatorInterface } from "./validatorInterface";

export class ValidatorUser implements ValidatorInterface {
    public messages: any;

    constructor() {
        this.messages = {
            id: 'ID inválido!',
            email: 'E-mail inválido!',
            password: 'Password Inválido (Min: 6 caracteres)',
            type: 'Selecione o tipo de usuário'
        };
    }

    public validate(req: Express.Session, fieldsValidation: any) {
        if (fieldsValidation.id) {
            req.check('id', this.messages.id).isNumeric();
        }

        if (fieldsValidation.email) {
            req.check('email', this.messages.email).isEmail();
        }

        if (fieldsValidation.password) {
            req.check('password', this.messages.password).isLength({ min: 6 });
        }

        if (fieldsValidation.type) {
            req.check('type', this.messages.type).isLength({max:1}).matches(/[0-1]/);
        }

        let validationErrors = req.validationErrors();

        if (validationErrors) {
            return this.getErrors(validationErrors);
        }

        return false;
    }

    public getErrors(validationErrors: Array<String>) {
        let errors: Array<String> = [];

        validationErrors.forEach((error: any) => {
            errors.push(error.msg);
        });

        return errors;
    }
}