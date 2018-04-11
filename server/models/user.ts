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

}