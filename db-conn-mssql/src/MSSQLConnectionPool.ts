import { ConnectionPool } from 'db-conn';
import * as mssql from 'mssql';


export class MSSQLConnectionPool implements ConnectionPool{
	open() {
		const pool = new mssql.ConnectionPool({ /* config */ })
	}

	transaction(sql: string, params: [any]): Promise<void> {
		throw new Error("Method not implemented.");
	}


}