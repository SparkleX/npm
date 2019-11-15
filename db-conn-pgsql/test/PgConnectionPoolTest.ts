import {ConnectionPool, Connection} from "db-conn"
import {PgConnectionPool} from "../src/index"
import {sqlTest} from "./TestCase"
import {describe,it} from "mocha"
import {expect} from 'chai'
import {mock, instance,verify,deepEqual, when} from "ts-mockito"

describe(__filename, () => {
    it(__filename, async () => {
		const config = {
			user: "postgres",
			password: "1234",
			host: 'localhost',
			port: 5432,
			database: 'test',
			max: 2
		  };		
		let pool:ConnectionPool = new PgConnectionPool();
		await pool.open(config);
		var conn0:Connection = await pool.getConnection();
		var conn1:Connection = await pool.getConnection();
		await sqlTest(conn0);
		await sqlTest(conn1);
		await conn0.close();
		await conn1.close();
		await pool.close();
    });
});