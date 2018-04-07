import * as mysql from 'mysql';

export class Connection {
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
        }
    }

    public static call(): Connection {
        if (Connection.db && Connection.db.state === 'authenticated') {
            return Connection.db;
        }

        Connection.db = mysql.createConnection(Connection.getData());
        Connection.db.connect((err: String) => {
            if (err) {
                throw 'errorConnection:' + err;
            }
        });

        return Connection.db;
    }
}