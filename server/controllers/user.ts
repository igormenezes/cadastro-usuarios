import { User } from "../models/user";
import { ValidatorUser } from "../helpers/validator/validatorUser";

export = (app: any) => {
    app.post('/save', (req: any, res: any) => {
        function validation(): Promise<any> {
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

        function saveUser(): Promise<any> {
            return new Promise((resolve, reject) => {
                let user: User = new User;

                user.save(req.body, (err: any, data: any) => {
                    if (err) {
                        let error: Object = { msg: err, status: 400 };
                        reject(error);
                    }

                    resolve(data);
                });
            });
        }

        validation()
            .then(saveUser)
            .then(resolve => {
                res.status(200).send({ success: true, msg: 'Usuário registrado com sucesso!' });

            })
            .catch(reject => {
                res.status(reject.status).send({ success: false, msg: reject.msg });
            })
    });

    app.get('/show-user/:id', (req: any, res: any) => {
        function validation(): Promise<any> {
            return new Promise((resolve, reject) => {
                let validatorUser = new ValidatorUser();
                let err = validatorUser.validate(req, true);

                if (err) {
                    let error: Object = { msg: err, status: 200 };
                    reject(error);
                }

                resolve(true);
            });
        }

        function getUser(): Promise<any> {
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

        validation()
            .then(getUser)
            .then(resolve => {
                console.log('success', resolve);
                res.status(200).send({ success: true, data: resolve });
            })
            .catch(reject => {
                console.log('error', reject);
                res.status(reject.status).send({ success: false, msg: reject.msg });
            })
    });
}