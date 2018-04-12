import { validationUserPromise } from "../helpers/promises/validationUser";
import { validationIdUserPromise } from "../helpers/promises/validationIdUser";
import { saveUserPromise } from "../helpers/promises/saveUser";
import { getUserIdPromise } from "../helpers/promises/getUserId";

export = (app: any) => {
    app.post('/save', (req: any, res: any) => {
        validationUserPromise(req)
            .then(() =>
                saveUserPromise(req)
            )
            .then(resolve => {
                res.status(200).send({ success: true, msg: 'Usuário registrado com sucesso!' });
            })
            .catch(reject => {
                res.status(reject.status).send({ success: false, msg: reject.msg });
            })
    });

    app.get('/show-user/:id', (req: any, res: any) => {
        validationIdUserPromise(req)
            .then(() =>
                getUserIdPromise(req)
            )
            .then(resolve => {
                res.status(200).send({ success: true, data: resolve });
            })
            .catch(reject => {
                res.status(reject.status).send({ success: false, msg: reject.msg });
            })
    });
}