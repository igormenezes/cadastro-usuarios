import { User } from "../../models/user";

export function getUserIdPromise(req: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let user: User = new User;

        user.get(req.params.id, (err: any, data: any) => {
            if (err) {
                let error: Object = { msg: err, status: data ? 200 : 400 };
                reject(error);
            }

            resolve(data);
        });
    });
}