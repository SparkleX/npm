import {RepositoryHandler} from "./RepositoryHandler"

export class RepositoryFactory {
    public static newRepository<REPO>(c: new () => REPO,  callback:RepositoryHandler): REPO {
        var face:REPO = new c();
        var proxyHandler = new MyProxy(callback);
        var p = new Proxy(face, proxyHandler);
        return p;
    }
}

class RepositoryData {
    handler: RepositoryHandler;
    sql:string;
    constructor(sql:string, handler:RepositoryHandler) {
        this.sql = sql;
        this.handler = handler
    }
}

class MyProxy implements ProxyHandler<any> {
    private handler: RepositoryHandler;
    constructor(handler:RepositoryHandler) {
        this.handler = handler
    }
    get? (target: any, propKey:PropertyKey, receiver: any): any{
        var func = propKey.toString();
        var sql = Reflect.getMetadata("Query", target, func);

        var repoData = new RepositoryData(sql, this.handler);
        return proxyFunction.bind(repoData);
    } 
}
async function proxyFunction (...params:any):Promise<any[]> {
	var args:any[] = [];
	args.push(this.sql);
	args = args.concat(params);
    var data = await this.handler.execute.apply(null,args);
    return data;
}