import { Connection, Result } from "db-conn";
import {expect} from 'chai'

export async function sqlTest(conn:Connection):Promise<void> {
	var result:Result ;
	try {
		await conn.execute('drop table test');
	}catch(e) {
		//console.log(e);
	}
	let sql:string  = 'CREATE TABLE test(id integer NOT NULL,name character varying(128),PRIMARY KEY (id))';
	result = await conn.execute(sql);
	expect(result.rowsAffected).to.equal(undefined);
	result = await conn.execute("insert into test(id, name) values(1,'a')");
	expect(result.rowsAffected).to.equal(1);
	result = await conn.execute("insert into test(id, name) values(2,'b')");
	expect(result.rowsAffected).to.equal(1);
	result = await conn.execute("insert into test(id, name) values(3,'c')");
	expect(result.rowsAffected).to.equal(1);
	result = await conn.execute('select * from test');
	expect(result.rowsAffected).to.equal(3);
	expect(result.recordset[0].id).to.equal(1);
	return;
}
export async function transactionTest(conn:Connection):Promise<void> {
	await transactionCommit(conn);
	await transactionRollback(conn);

}
export async function transactionRollback(conn:Connection):Promise<void> {
	var result:Result ;
	await conn.setAutoCommit(true);
	result = await conn.execute("delete from test");
	await conn.setAutoCommit(false);
	result = await conn.execute("insert into test(id, name) values(1,'a')");
	await conn.rollback();
	result = await conn.execute('select * from test');
	expect(result.recordset.length).to.equal(0);
	return;
}

export async function transactionCommit(conn:Connection):Promise<void> {
	var result:Result ;
	await conn.setAutoCommit(true);
	result = await conn.execute("delete from test");
	await conn.setAutoCommit(false);
	result = await conn.execute("insert into test(id, name) values(1,'a')");
	await conn.commit();
	result = await conn.execute('select * from test');
	expect(result.recordset.length).to.equal(1);
	return;
}