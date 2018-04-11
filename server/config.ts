import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as expressValidator from 'express-validator';

class Config {
    readonly app: any;
    readonly consign: any;

    constructor() {
        this.consign = require('consign');
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());
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
            .then('db')
            .into(this.app);

        return this.app;
    }

}

let config: Config = new Config();
export default config.autoload();
