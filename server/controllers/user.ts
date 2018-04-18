import { validationUserPromise } from "../helpers/promises/validationUser";
import { validationIdUserPromise } from "../helpers/promises/validationIdUser";
import { saveUserPromise } from "../helpers/promises/saveUser";
import { getUserIdPromise } from "../helpers/promises/getUserId";
import { getUserAllPromise } from "../helpers/promises/getUserAll";
import { authenticationPassport } from "../helpers/authentication/passport";
import { checkLogin } from "../middlewares/middlewares";

export = (app: any) => {
    app.post('/save', (req: Express.Session, res: Express.Session) => {
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

    app.get('/show-user/:id', (req: Express.Session, res: Express.Session) => {
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

    app.get('/show-users', (req: Express.Session, res: Express.Session) => {
        getUserAllPromise(req)
        .then(resolve => {
            res.status(200).send({ success: true, data: resolve });
        })
        .catch(reject => {
            res.status(reject.status).send({ success: false, msg: reject.msg });
        })
    });

    app.post('/login', (req: Express.Session, res: Express.Session) => {
        let authentication = new authenticationPassport();

        authentication.initiallize(req, res)
            .then(resolve => {
                res.status(200).send({ success: true, data: resolve });
            })
            .catch(reject => {
                res.status(reject.status).send({ success: false, msg: reject.msg });
            });
    });
}