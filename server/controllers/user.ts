import { validationUserPromise } from "../helpers/promises/validationUser";
import { saveUserPromise } from "../helpers/promises/saveUser";
import { updateUserPromise } from "../helpers/promises/updateUser";
import { findExistUserByEmailPromise } from "../helpers/promises/findExistUserByEmail";
import { getUserIdPromise } from "../helpers/promises/getUserId";
import { getUserAllPromise } from "../helpers/promises/getUserAll";
import { authenticationPassport } from "../helpers/authentication/passport";
import { checkLogin } from "../middlewares/middlewares";

export = (app: any) => {
    app.post('/save', (req: Express.Session, res: Express.Session) => {
        let fieldsValidation: Object = { email: true, password: true, type: true };

        validationUserPromise(req, fieldsValidation)
            .then(() =>
                findExistUserByEmailPromise(req.body.email)
            )
            .then(() =>
                saveUserPromise(req)
            )
            .then(resolve => {
                res.status(200).send({ success: true, msg: 'Usuário registrado com sucesso!', id: resolve });
            })
            .catch(reject => {
                res.status(reject.status).send({ success: false, repeatUser: reject.repeatUser, msg: reject.msg });
            })
    });

    app.post('/update-user/:id', (req: Express.Session, res: Express.Session) => {
        let fieldsValidation: Object = { id: true, type: true };
        let datas: any = { id: req.params.id, type: req.body.type };

        validationUserPromise(req, fieldsValidation)
            .then(() =>
                updateUserPromise(datas)
            )
            .then(resolve => {
                res.status(200).send({ success: true, msg: 'Dados do usuário atualizado com sucesso!' });
            })
            .catch(reject => {
                res.status(reject.status).send({ success: false, repeatUser: reject.repeatUser, msg: reject.msg });
            })
    });

    app.get('/show-user/:id', checkLogin, (req: Express.Session, res: Express.Session) => {
        let fieldsValidation: Object = { id: true };

        validationUserPromise(req, fieldsValidation)
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

    app.get('/show-users', checkLogin, (req: Express.Session, res: Express.Session) => {
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

    app.get('/verify-user', checkLogin, (req: Express.Session, res: Express.Session) => {
        res.status(200).send({ success: true });
    });

    app.get('/logout', function (req: Express.Session, res: Express.Session) {
        req.logout();
        res.status(200).send({ success: true });
    });
}