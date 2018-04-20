import { User } from "../../models/user";

export function findExistUserByEmailPromise(email: String): Promise<any> {
    return new Promise((resolve, reject) => {
        let user: User = new User;

        user.getByEmail(email, (err: any, existUser: any) => {
            if (err && !existUser) {
                let error: Object = { msg: err, status: 400 };
                reject(error);
            }
            if (!err && existUser) {
                let error: Object = { msg: 'E-mail de usuário já existente!', repeatUser: true, status: 200 };
                reject(error);
            }

            resolve(true);
        });
    });
}