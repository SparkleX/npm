export interface  RepositoryHandler {
	execute(query:string, ...params:any):Promise<any>;
}
