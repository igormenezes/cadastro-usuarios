export class ValidatorInterface {
    public messages: any;

    public validate(req: Express.Session) { }
    public getErrors(validatorErrors: Array<String>) { }
}