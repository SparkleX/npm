import {ConnectionPool} from "db-conn"
import {MSSQLConnectionPool} from "../src/index"
import {describe,it} from "mocha"
import {expect} from 'chai'
import {mock, instance,verify,deepEqual, when} from "ts-mockito"

describe(__filename, () => {
    it(__filename, async () => {
		let pool:ConnectionPool = new MSSQLConnectionPool();
		pool
    });
});