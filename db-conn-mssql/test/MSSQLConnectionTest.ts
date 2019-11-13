import {Connection} from "db-conn"
import {MSSQLConnection} from "../src/index"
import {describe,it} from "mocha"
import {expect} from 'chai'
import {mock, instance,verify,deepEqual, when} from "ts-mockito"

describe(__filename, () => {
    it(__filename, async () => {
		let conn:Connection = new MSSQLConnection();
		await conn.open('mssql://sa:12345678@localhost/test');
		let result:any;
		result = await conn.execute('drop table test');
		let sql:string  = 'create table TEST([ID] int,[Name] nvarchar(50) primary key(ID))';
		result = await conn.execute(sql);
		expect(result.rowsAffected).to.equal(undefined);
		result = await conn.execute("insert into test([ID], Name) values(1,'a')");
		expect(result.rowsAffected).to.equal(1);
		result = await conn.execute("insert into test([ID], Name) values(2,'b')");
		expect(result.rowsAffected).to.equal(1);
		result = await conn.execute("insert into test([ID], Name) values(3,'c')");
		expect(result.rowsAffected).to.equal(1);
		result = await conn.execute('select * from test');
		expect(result.rowsAffected).to.equal(3);
		expect(result.recordset[0].ID).to.equal(1);
		console.dir(result);
		await conn.close();
    });
});