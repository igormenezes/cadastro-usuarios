import { ValidatorUser } from "../validator/validatorUser";

export function validationUserPromise(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let validatorUser = new ValidatorUser();
        let err = validatorUser.validate(req);

        if (err) {
            let error: Object = { msg: err, status: 200 };
            reject(error);
        }

        resolve(true);
    });
}