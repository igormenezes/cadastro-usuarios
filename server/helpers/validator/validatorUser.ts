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

    public validate(req: Express.Session, onlyId?: Boolean) {
        if (onlyId) {
            req.check('id', this.messages.id).isNumeric();
        } else {
            req.check('email', this.messages.email).isEmail();
            req.check('password', this.messages.password).isLength({ min: 6 });
            req.check('type', this.messages.type).notEmpty();
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