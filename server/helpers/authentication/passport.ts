import { PASSPORT } from "../../config";
import { PASSPORTLOCAL } from "../../config";
import { User } from "../../models/user";

export class authenticationPassport {
    readonly localStrategy: any;
    readonly passport: any;

    constructor() {
        this.passport = PASSPORT;
        this.localStrategy = PASSPORTLOCAL;

        this.passport.serializeUser((user: any, done: any) => {
            console.log('serializeUser', 'User:' + user.id);
            done(null, user.id);
        })

        this.passport.deserializeUser((id: any, done: any) => {
            console.log('deserializeUser', 'Id:' + id);
            let user = { 'id': 13, 'email': 'jesus@yahoo.com.br' };
            done(null, user.id);
        })

        this.passport.use('login', new this.localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (username: any, password: any, done: any) => {
                let user = new User();
                user.getByEmailPassword(username, password, (err: any, data: any) => {
                    if (err) {
                        let error: Object = { msg: err, status: data ? 200 : 400 };
                        return done(error);
                    }

                    done(null, data);
                });
            }
        ))
    }

    public initiallize(req: Express.Session, res: Express.Response): Promise<any> {
        return new Promise((resolve, reject) => {
            this.passport.authenticate('login', (err: any, user: any, info: any) => {
                if (err) {
                    return reject(err);
                }

                req.login(user, function (err: any) {
                    if (err) {
                        return reject('Erro ao realizar login: ' + err);
                    }

                    return resolve(user.id);
                });
            })(req, res)
        });
    }
}