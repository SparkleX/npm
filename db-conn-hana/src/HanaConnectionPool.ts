import { ConnectionPool,Connection } from 'db-conn';
import {HanaConnection} from "./HanaConnection";
import * as hdbPool from "hdb-pool";

export class HanaConnectionPool implements ConnectionPool{
	pool: any;
	public async open(config:any):Promise<void> {
		const options = {
			min: 2,
			max: 15,
		};		
		this.pool = hdbPool.createPool(config, options);
	}

	public async getConnection():Promise<Connection> {
		var client = await this.pool.getConnection();
		var conn:Connection = new HanaConnection(client);		
		return conn;
	}
	public async close():Promise<void> {
		await this.pool.clear();
		
	}

}