import { User } from "../../models/user";

export function getUserAllPromise(req: Express.Session): Promise<any> {
    return new Promise((resolve, reject) => {
        let user: User = new User;

        user.getAll((err: any, data: any) => {
            if (err) {
                let error: Object = { msg: err, status: data ? 200 : 400 };
                reject(error);
            }

            resolve(data);
        });
    });
}