import { User } from "../../models/user";

export function updateUserPromise(datas: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let user: User = new User;

        user.update(datas.id, datas.type, (err: any, data: any) => {
            if (err) {
                let error: Object = { msg: err, status: 400 };
                reject(error);
            }

            resolve(data);
        });
    });
}