import { User } from "../../models/user";

export function saveUserPromise(req: Express.Session): Promise<any>{
    return new Promise((resolve, reject) => {
        let user: User = new User;

        user.save(req.body.email, req.body.password, req.body.type, (err: any, data: any) => {
            if (err) {
                let error: Object = { msg: err, status: 400 };
                reject(error);
            }

            resolve(data);
        });
    });
}