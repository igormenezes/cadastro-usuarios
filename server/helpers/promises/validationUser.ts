import { ValidatorUser } from "../validator/validatorUser";

export function validationUserPromise(req: Express.Session, fieldsValidation: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        let validatorUser = new ValidatorUser();
        let err = validatorUser.validate(req, fieldsValidation);

        if (err) {
            let error: Object = { msg: err, status: 200 };
            reject(error);
        }

        resolve(true);
    });
}