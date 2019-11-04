import {Query} from "../src/index"

export class OrderRepository{
    @Query("select * from Item where code = $1")
    public async findByCode(code:string):Promise<[]> {return null}
}