export class ValidatorInterface {
    public messages: any;

    public validate(req: any) { }
    public getErrors(validatorErrors: Array<String>) { }
}