import { DBconnection } from "../db/DBconnectionAbstract";
import { Query } from "mysql";

export class User extends DBconnection {
    public save(user: any, callback: any) {
        let sql = 'INSERT INTO users (email, password, type) VALUES (?, ?, ?)';

        this.connection.query(sql, [user.email, user.password, user.type],
            (error: String, result: any) => {
                if (error) {
                    callback('errorSaveUser:' + error);
                }
                
                callback(null, result.insertId);
                this.connection.end();
            }
        );
    }

}