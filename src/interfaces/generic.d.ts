export interface CrudBasic<P, R> {
	getAll(): Promise<R[]>
	getById(id: string): Promise<R | null>
	create(data: P): Promise<R>
	update(id: string, data: Partial<P>): Promise<R>
	delete(id: string): Promise<R>
}