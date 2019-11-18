import {ConnectionPool, Connection} from "db-conn"
import {HanaConnection, HanaConnectionPool} from "../src/index"
import {sqlTest} from "./TestCase"
import {describe,it} from "mocha"
import {expect} from 'chai'

describe("__filename", () => {
    it("__filename", async () => {
		const config = {
			hostName     : '10.58.1.118',
			port     : 30015,
			userName     : 'SYSTEM',
			password : 'manager'
		};		
		let pool:ConnectionPool = new HanaConnectionPool();
		await pool.open(config);
		var conn0:Connection = await pool.getConnection();
		var conn1:Connection = await pool.getConnection();
		await conn0.execute("set schema TEST");
		await conn1.execute("set schema TEST");				
		await sqlTest(conn0);
		await sqlTest(conn1);
		await conn0.close();
		await conn1.close();
		await pool.close();
    });
});