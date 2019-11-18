import {Connection} from "db-conn"
import {describe,it} from "mocha"
import { hanaPromiseConnect } from "../src/HanaClientPromise";
import * as hdb from 'hdb';
import * as chai from 'chai'
import * as chaiAsPromised from "chai-as-promised";


describe("__filename", () => {
	before(async () => {
		chai.use(chaiAsPromised);
	});
    it("__filename", async () => {
		var config = {
			host     : '127.0.0.1',
			port     : 30016,
			user     : 'SYSTEM',
			password : 'manager'
		}
		var client = hdb.createClient(config);
		chai.expect(hanaPromiseConnect(client)).to.be.rejected;
    });
});