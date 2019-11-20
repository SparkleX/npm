import { Connection, Result } from 'db-conn';
import * as mssql from 'mssql';

export class MSSQLConnection implements Connection{
	private transaction:mssql.Transaction;

	private request:mssql.Request;
	private autoCommit:boolean = false;
	pool: any;
	public constructor(pool?:any) {
		this.pool = pool;
		if(this.pool) {
			this.request = new mssql.Request(this.pool);
		}
	}	
	public async setAutoCommit(autoCommit: boolean): Promise<void> {
		console.log(`MSSQLConnection.setAutoCommit: ${autoCommit}`);
		if(autoCommit) {
			if(this.transaction!=null) {
				await this.transaction.rollback();
			}
			this.transaction = null;
			this.request = new mssql.Request(this.pool);
			return;
		} else {
			this.transaction = new mssql.Transaction(this.pool)
			await this.transaction.begin();
			this.request = new mssql.Request(this.transaction);
			this.autoCommit = autoCommit;
		}
	}
	public async commit(): Promise<void> {
		console.log(`MSSQLConnection.commit`);
		await this.transaction.commit();
		if(this.autoCommit == false) {
			await this.transaction.begin();
		}
	}
	public async rollback(): Promise<void> {
		console.log(`MSSQLConnection.rollback`);
		await this.transaction.rollback();
		if(this.autoCommit == false) {
			await this.transaction.begin();
		}		
	}
	public async open(config: any) : Promise<void> {
		await (mssql as any).connect(config); 
		this.request = new mssql.Request();

	}
	public async execute(sql: string, params?: [any]): Promise<Result> {
		console.log(`MSSQLConnection.execute: ${sql}`);
		let rt:Result = new Result();
		var result:any = await this.request.query(sql);
		rt.rowsAffected = result.rowsAffected[0];
		rt.recordset = result.recordsets[0];
		return rt;
	}
	public async close():Promise<void> {
		//await (this.request as any).close();
		console.log(`MSSQLConnection.close`);
		if(this.transaction) {
			console.log(`MSSQLConnection.close.rollback`);
			await this.transaction.rollback();
		}
		await (mssql as any).close();
	}


}