import {ConnectionPool, Connection} from "db-conn"
import {MSSQLConnectionPool} from "../src/index"
import {describe,it} from "mocha"
import {expect} from 'chai'
import {mock, instance,verify,deepEqual, when} from "ts-mockito"
import { sqlTest, transactionTest } from "./TestCase"

describe(__filename, () => {
    it(__filename, async () => {
		let pool:ConnectionPool = new MSSQLConnectionPool();
		await pool.open('mssql://sa:12345678@localhost/test');
		
		var conn0:Connection = await pool.getConnection();
		var conn1:Connection = await pool.getConnection();
		await conn0.open('mssql://sa:12345678@localhost/test');
		try {
			await conn0.execute('drop table test');
		}catch(e) {
			//console.log(e);
		}

		let sql:string  = 'create table TEST("id" int,"name" nvarchar(50))'; // primary key("id")
		await conn0.execute(sql);		
		await sqlTest(conn0);
		await sqlTest(conn1);
		await transactionTest(conn0);
		await conn0.close();
		await conn1.close();
		await pool.close();
    });
});