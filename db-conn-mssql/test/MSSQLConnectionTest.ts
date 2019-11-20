import {Connection} from "db-conn"
import {MSSQLConnection} from "../src/index"
import {describe,it} from "mocha"
import {expect} from 'chai'
import {mock, instance,verify,deepEqual, when} from "ts-mockito"
import { transactionTest, sqlTest } from "./TestCase"

describe(__filename, () => {
    it(__filename, async () => {
		var conn:Connection = new MSSQLConnection();
		await conn.open('mssql://sa:12345678@localhost/test');
		try {
			await conn.execute('drop table test');
		}catch(e) {
			//console.log(e);
		}

		let sql:string  = 'create table TEST("id" int,"name" nvarchar(50))'; // primary key("id")
		await conn.execute(sql);
		await sqlTest(conn);
		await transactionTest(conn);
		await conn.close();		
    });
});