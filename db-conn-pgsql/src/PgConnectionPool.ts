import { ConnectionPool,Connection } from 'db-conn';
import {PgConnection} from "./PgConnection";
import * as Pool from 'pg-pool';

export class PgConnectionPool implements ConnectionPool{
	pool: any;
	public async open(config:any):Promise<void> {
		this.pool = new Pool(config);
	}

	public async getConnection():Promise<Connection> {
		var client = await this.pool.connect();
		var conn:Connection = new PgConnection(client);		
		return conn;
	}
	public async close():Promise<void> {
		await this.pool.end()
		
	}

}