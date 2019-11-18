import { Connection, Result } from 'db-conn';
import * as hdb from 'hdb';
import { hanaPromiseConnect } from './HanaClientPromise';

export class HanaConnection implements Connection{
	private client: any;
	public constructor(conn?:any) {
		this.client = conn;
	}
	public async open(config:any) : Promise<void> {
		this.client = hdb.createClient(config);
		return hanaPromiseConnect(this.client);		
	}
	public async execute(sql: string, params?: [any]): Promise<Result> {
		console.log(`HanaConnection.execute: ${sql}`);
		return new Promise((resolve, reject) =>
			this.client.prepare(sql, function(err, statement) {
				if (err) {
					console.error('Prepare error:', err);
					reject(err);
					return;
				}
				statement.exec(params===undefined?[]:params, function(err, parameters, dummyRows, tableRows) {
					if (err) {
						console.error('Exec error:', err);
						reject(err);
						return;
					}
					//console.log('Parameters:', parameters);
					//console.log('Dummies:', dummyRows);
					//console.log('Tables:', tableRows);
					let rt:Result = new Result();
					if(parameters===undefined || parameters=== null) {

					}else if(Array.isArray(parameters)) {
						rt.recordset = parameters as [any];	
						rt.rowsAffected = rt.recordset.length;
					}
					else {
						rt.rowsAffected = parameters;
					}
					resolve(rt);
				});
			})
		);					
	}
	public async close():Promise<void> {
		await this.client.end();	
	}
	async setAutoCommit(autoCommit:boolean): Promise<void> {
		console.log(`HanaConnection.setAutoCommit: ${autoCommit}`);
		await this.client.setAutoCommit(autoCommit);
	}
	async commit(): Promise<void> {
		console.log(`HanaConnection.commit`);
		return new Promise((resolve, reject) =>	{	
			this.client.commit(function(err){
				reject(err);
				return;
			});
			resolve();
		});
	}
	async rollback(): Promise<void> {
		console.log(`HanaConnection.rollback`);
		return new Promise((resolve, reject) =>	{	
			this.client.rollback(function(err){
				reject(err);
				return;
			});
			resolve();
		});
	}

}