import * as mysql from 'mysql';

export class ConnectionFactory {
    private static db: any;

    private static getData(): Object {
        if (!process.env.NODE_ENV) {
            return {
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'cadastro_usuarios'
            };
        } else if (process.env.NODE_ENV == 'dev') {
            return {
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'cadastro_usuarios'
            };
        } else if (process.env.NODE_ENV == 'test') {
            return {
                host: 'localhost',
                user: 'root',
                password: '123',
                database: 'cadastro_usuarios_test'
            };
        }
    }

    public static call(): ConnectionFactory {
        ConnectionFactory.db = mysql.createConnection(ConnectionFactory.getData());
        ConnectionFactory.db.connect((err: String) => {
            if (err) {
                throw 'errorConnection:' + err;
            }
        });

        return ConnectionFactory.db;
    }
}