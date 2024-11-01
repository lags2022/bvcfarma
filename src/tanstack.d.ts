import '@tanstack/react-table' //or vue, svelte, solid, qwik, etc.
import { RouteTable, TypeTableDashboard } from './interfaces/general'

declare module '@tanstack/table-core' {
	interface TableMeta<TData extends RowData> {
		typeTableDashboard: TypeTableDashboard
		route: RouteTable
	}
}
