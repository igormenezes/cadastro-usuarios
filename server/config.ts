import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as expressValidator from 'express-validator';
import * as session from 'express-session';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';

export const PASSPORT = passport;
export const PASSPORTLOCAL = passportLocal.Strategy;

class Config {
    readonly app: any;
    readonly consign: any;

    constructor() {
        this.consign = require('consign');
        this.app = express();
        this.app.use(cors({
            origin: [
                "http://localhost:4200",
            ],
            credentials: true
        }));

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());

        this.app.use(session({
            secret: 'shh128sj',
            resave: true,
            saveUninitialized: true
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    public autoload(): any {
        this.consign(
            {
                extensions: ['.js', '.json', '.node'],
                cwd: process.env.NODE_ENV == 'dev' ? 'dist' : ''
            })
            .include('controllers')
            .then('models')
            .then('helpers')
            .then('middlewares')
            .then('db')
            .into(this.app);

        return this.app;
    }
}

let config: Config = new Config();
export default config.autoload();