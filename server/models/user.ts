import { connectionAbstract } from "../db/connectionAbstract";
import { Query } from "mysql";

export class User extends connectionAbstract {
    public save(email: String, password: String, type: Number, callback: any) {
        let sql = 'INSERT INTO users (email, password, type) VALUES (?, ?, ?)';

        this.connection.query(sql, [email, password, type],
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
                    return callback('Usuário não encontrado!', true);
                }

                callback(null, result[0]);
                this.connection.end();
            }
        );
    }

    public getByEmailPassword(email: String, password: String, callback: any){
        let sql = "SELECT * FROM users WHERE email = ? AND password = ?";

        this.connection.query(sql, [email, password],
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
}