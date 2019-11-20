import { ConnectionPool, Connection } from 'db-conn';
import * as mssql from 'mssql';
import { MSSQLConnection } from '.';


export class MSSQLConnectionPool implements ConnectionPool{
	private pool: mssql.ConnectionPool;
	public async open(config:any): Promise<void> {
		this.pool = new mssql.ConnectionPool(config)
		await this.pool.connect();
	}

    public async getConnection(): Promise<Connection> {
		var conn:Connection = new MSSQLConnection(this.pool);		
		return conn;		
	}
    public async close(): Promise<void> {
		await this.pool.close();
	}

}