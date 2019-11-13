function injectable() { // this is the decorator factory
    return function (target) { // this is the decorator
        // do something with 'target' and 'value'...
    }
}
function inject(formatString: string) {
    return null;
}



var TYPES = {Repository:"1234"}

@injectable()
class Repository{
	public query1():void {}
	public query2():void {}
}

@injectable()
class ComponentA {

	@inject(TYPES.Repository)
	private repository: Repository;

	public example():void {
		this.repository.query1()
	}
}