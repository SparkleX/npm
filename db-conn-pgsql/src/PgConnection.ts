import { Connection, Result } from 'db-conn';
import { Client } from 'pg';
export class PgConnection implements Connection{
	private client: any;
	public constructor(conn?:any) {
		this.client = conn;
	}
	public async open(config:any) : Promise<void> {
		this.client = new Client(config);
        await this.client.connect();
	}
	public async execute(sql: string, params?: [any]): Promise<Result> {
		console.log(`PgConnection.execute: ${sql}`);
		var result = await this.client.query(sql, params);
		let rt:Result = new Result();
		//console.dir(result);
		if(result.rowCount!=null) {
			rt.rowsAffected = result.rowCount;
		}
		rt.recordset = result.rows;		
		return rt;
	}
	public async close():Promise<void> {
		if(this.client.release) {
			await this.client.release();
		}
		else {
			await this.client.end();	
		}
	}
	async setAutoCommit(autoCommit:boolean): Promise<void> {
		if(autoCommit==false) {
			await this.client.query('BEGIN');
		}
	}
	async commit(): Promise<void> {
		await this.client.query('COMMIT');
	}
	async rollback(): Promise<void> {
		await this.client.query('ROLLBACK')
	}

}