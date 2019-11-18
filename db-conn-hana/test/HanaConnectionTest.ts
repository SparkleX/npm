import {Connection} from "db-conn"
import {HanaConnection} from "../src/index"
import {describe,it} from "mocha"
import { sqlTest, transactionTest } from "./TestCase"

describe("__filename", () => {
    it("__filename", async () => {
		var config = {
			host     : '10.58.1.118',
			port     : 30015,
			user     : 'SYSTEM',
			password : 'manager'
		}
		var conn:Connection = new HanaConnection();
		await conn.open(config);
		await conn.execute("set schema TEST");
		await sqlTest(conn);
		await transactionTest(conn);
		await conn.close();
    });
});