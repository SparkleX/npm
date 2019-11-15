import {Result} from "./Result"
export interface Connection {
	open(config:any) : Promise<void>;
	close():Promise<void>;
	execute(sql:string, params?:[any]):Promise<Result>;
}