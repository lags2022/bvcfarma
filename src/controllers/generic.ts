// import { CrudBasic } from '@/interfaces/generic'

// export abstract class GenericCrud<T extends CrudBasic<P, R>, P, R>
// 	implements CrudBasic<P, R>
// {
// 	protected model: T

// 	constructor(model: T) {
// 		this.model = model
// 	}

// 	async getAll(): Promise<R[]> {
// 		return this.executeAction(() => this.model.getAll())
// 	}

// 	async getById(id: string): Promise<R> {
// 		return this.executeAction(() => this.model.getById(id))
// 	}

// 	async create(data: P): Promise<R> {
// 		return this.executeAction(() => this.model.create(data))
// 	}

// 	async update(id: string, data: Partial<P>): Promise<R> {
// 		return this.executeAction(() => this.model.update(id, data))
// 	}

// 	async delete(id: string): Promise<R> {
// 		return this.executeAction(() => this.model.delete(id))
// 	}

// 	async executeAction<U>(action: () => Promise<U>): Promise<U> {
// 		try {
// 			return await action()
// 		} catch (error) {
// 			console.error('Error in GenericCrud operation:', error)
// 			throw error
// 		}
// 	}
// }
