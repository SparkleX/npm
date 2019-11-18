import {Connection} from "db-conn"
import {PgConnection} from "../src/index"
import {describe,it} from "mocha"
import { sqlTest, transactionTest } from "./TestCase"

describe(__filename, () => {
    it(__filename, async () => {
		var config = {
			host: 'localhost',
			port: 5432,
			user: 'postgres',
			password: '1234',
			database: 'test'
		  }
		var conn:Connection = new PgConnection();
		await conn.open(config);
		await sqlTest(conn);
		await transactionTest(conn);
		await conn.close();
    });
});