import {Result} from "./Result"
export interface Connection {
	open(connStr:string) : Promise<void>;
	close():Promise<void>;
	execute(sql:string, params?:[any]):Promise<Result>;
}