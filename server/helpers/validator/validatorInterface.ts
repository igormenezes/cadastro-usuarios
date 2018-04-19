export class ValidatorInterface {
    public messages: any;

    public validate(req: Express.Session, fieldsValidation: any) { }
    public getErrors(validatorErrors: Array<String>) { }
}