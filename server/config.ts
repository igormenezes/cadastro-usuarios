import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

class Config {
    readonly app: any;
    readonly consign: any;

    constructor() {
        this.consign = require('consign');
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }

    public autoload(): any {
        this.consign(
            {
                extensions: ['.js', '.json', '.node'],
                cwd: process.env.NODE_ENV == 'dev' ? 'dist' : ''
            })
            .include('controller')
            .then('model')
            .then('db')
            .into(this.app);

        return this.app;
    }

}

let config: Config = new Config();
export default config.autoload();
