import { Connection, Result } from 'db-conn';
import { Client } from 'pg';
export class PgConnection implements Connection{
	conn: any;
	public constructor(conn?:any) {
		this.conn = conn;
	}
	public async open(config:any) : Promise<void> {
		this.conn = new Client(config);
        await this.conn.connect();
	}
	public async execute(sql: string, params?: [any]): Promise<Result> {
		var result = await this.conn.query(sql, params);
		let rt:Result = new Result();
		//console.dir(result);
		if(result.rowCount!=null) {
			rt.rowsAffected = result.rowCount;
		}
		rt.recordset = result.rows;		
		return rt;
	}
	public async close():Promise<void> {
		if(this.conn.release) {
			await this.conn.release();
		}
		else {
			await this.conn.end();	
		}
	}


}