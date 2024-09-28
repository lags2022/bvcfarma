import { FilterTypes } from '@/context/useFilterStore'

interface MultiLevelProps {
	id: number
	type: FilterTypes
	name: string
	idCategory?: string
	idSubCategory?: string
}

export interface MultiLevel extends MultiLevelProps {
	icon: string
	color: string
	items: (MultiLevelProps &
		Partial<{
			items: MultiLevelProps[]
		}>)[]
}
