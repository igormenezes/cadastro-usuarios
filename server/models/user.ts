import { connectionAbstract } from "../db/connectionAbstract";
import { Query } from "mysql";

export class User extends connectionAbstract {
    public save(user: any, callback: any) {
        let sql = 'INSERT INTO users (email, password, type) VALUES (?, ?, ?)';

        this.connection.query(sql, [user.email, user.password, user.type],
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSaveUser:' + error);
                }

                callback(null, result.insertId);
                this.connection.end();
            }
        );
    }

    public get(id: Number, callback: any) {
        let sql = "SELECT * FROM users WHERE id = ?";

        this.connection.query(sql, id,
            (error: String, result: any) => {
                if (error) {
                    return callback('errorSelectUser:' + error);
                }

                if (result.length === 0) {
                    callback('Usuário não encontrado!', true);
                }

                callback(null, result[0]);
                this.connection.end();
            }
        );
    }
}