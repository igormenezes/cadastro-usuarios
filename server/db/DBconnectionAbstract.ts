import { Connection } from "../db/connectionFactory";

export abstract class DBconnection{
    protected connection: any

    constructor() {
        this.connection = Connection.call();
    }
}