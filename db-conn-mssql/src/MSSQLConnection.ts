import { Connection, Result } from 'db-conn';
import * as mssql from 'mssql';


export class MSSQLConnection implements Connection{
	public async open(connStr:string) : Promise<void> {
		await mssql.connect(connStr); 
        
	}
	public async execute(sql: string, params?: [any]): Promise<Result> {
		let rt:Result = new Result();
		const result = await mssql.query(sql);
		rt.rowsAffected = result.rowsAffected[0];
		rt.recordset = result.recordset;
		return rt;
	}
	public async close():Promise<void> {
		mssql.close();
	}


}