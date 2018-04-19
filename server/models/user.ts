import { connectionAbstract } from "../db/connectionAbstract";
import { Query } from "mysql";
import { BCRYPT } from '../config';

export class User extends connectionAbstract {
    public save(email: String, password: String, type: Number, callback: any) {
        let sql = 'INSERT INTO users (email, password, type) VALUES (?, ?, ?)';

        this.connection.query(sql, [email, BCRYPT.hashSync(password, 10), type],
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSaveUser:' + error);
                }

                callback(null, result.insertId);
                this.connection.end();
            }
        );
    }

    public update(id: Number, email: String, type: Number, callback: any) {
        let sql = 'UPDATE users SET email = ?, type = ? WHERE id = ?';

        this.connection.query(sql, [email, type, id],
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSaveUser:' + error);
                }

                callback(null, result.insertId);
                this.connection.end();
            }
        );
    }

    public getById(id: Number, callback: any) {
        let sql = "SELECT * FROM users WHERE id = ?";

        this.connection.query(sql, id,
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSelectUser:' + error);
                }

                if (result.length === 0) {
                    return callback('Usuário não encontrado!', true);
                }

                callback(null, result[0]);
                this.connection.end();
            }
        );
    }

    public getByEmail(email: String, callback: any) {
        let sql = "SELECT * FROM users WHERE email = ?";

        this.connection.query(sql, [email],
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSelectUserByEmailPassword:' + error);
                }

                if (result.length === 0) {
                    return callback('Usuário não encontrado!', true);
                }

                callback(null, result[0]);
                this.connection.end();
            }
        );
    }

    public getAll(callback: any) {
        let sql = "SELECT * FROM users";

        this.connection.query(sql,
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSelectUserAll:' + error);
                }

                if (result.length === 0) {
                    return callback('Não foi encontrado nenhum usuário!', true);
                }

                callback(null, result);
                this.connection.end();
            }
        );
    }
}