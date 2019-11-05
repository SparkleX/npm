import "reflect-metadata";

export class CrudRepository<T,ID> {
    async findByKey(id: ID): Promise<T> {
        return null;
	}
    async insert(data: T): Promise<void> {
	}	
    async update(data: T): Promise<void> {
    }	
	async deleteById(id: ID): Promise<void> {
    }
}