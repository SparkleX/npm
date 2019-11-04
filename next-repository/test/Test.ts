import {RepositoryFactory, RepositoryHandler} from "../src/index"
import {describe,it} from "mocha"
import {expect} from 'chai'
import {mock, instance,verify,deepEqual, when} from "ts-mockito"
import {OrderRepository} from "./OrderRepository"

class RepoHandlerImpl implements RepositoryHandler {
    execute(sql: string, ...params: any): Promise<any> {
		console.debug("Should be mocked");
        throw "Should be mocked";
    }
}

describe('Main Test', () => {
    it('Simple Repository', async () => {
        //mock
        let mockedHandler:RepoHandlerImpl = mock(RepoHandlerImpl);
        let mockInstance:RepoHandlerImpl = instance(mockedHandler);
        //prepare data
        var rt:any[] = [];
        when(mockedHandler.execute("select * from Item where code = $1",deepEqual("1"))).thenResolve(rt);
        //test
        var orderRepository = RepositoryFactory.newRepository(OrderRepository, mockInstance);
        var result = await orderRepository.findByCode("1");        
        //verify data
        expect(result).to.equal(rt);
        //verify mock
        verify(mockedHandler.execute("select * from Item where code = $1",deepEqual("1"))).called();
    });
    it('Success Sample', () => {

     /*   let mockedHandler:RepoHandlerImpl = mock(RepoHandlerImpl);
        let mockInstance:RepoHandlerImpl = instance(mockedHandler);

        var orderRepository = RepositoryFactory.newRepository(OrderRepository, mockInstance);
        orderRepository.findByCode("1");
        verify(mockedHandler.execute("select * from Order where code = ?",deepEqual(["1"]))).called();*/
    });
});