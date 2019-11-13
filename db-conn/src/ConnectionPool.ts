export interface ConnectionPool {
	execute(sql:string, params:[any]):Promise<void>;
}