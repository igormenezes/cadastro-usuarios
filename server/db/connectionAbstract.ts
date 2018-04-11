import { ConnectionFactory } from "../db/connectionFactory";

export abstract class connectionAbstract{
    protected connection: any

    constructor() {
        this.connection = ConnectionFactory.call();
    }
}