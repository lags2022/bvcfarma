// navbar
export const ICON_MULTILEVEL_NAVBAR_CATEGORIA = {
	medicamentos: { color: 'bg-red-500' },
	suplementos: { color: 'bg-green-500' },
	'cuidado personal': { color: 'bg-pink-500' },
	'adulto mayor': { color: 'bg-blue-500' },
	dermocosmetica: { color: 'bg-yellow-500' },
	infantil: { color: 'bg-purple-500' },
	maternidad: { color: 'bg-orange-500' },
	blog: { color: 'bg-gray-500' },
} as {
	[key: string]: { color: string }
}

export const MOCKUP_MULTILEVEL_NAVBAR_TIPOS = [
	{
		id: 10,
		name: 'adulto mayor',
		icon: '👨‍👩‍👧‍👦',
	},
	{
		id: 11,
		name: 'dermocosmetica',
		icon: '💄',
	},
	{
		id: 12,
		name: 'infantil',
		icon: '👶',
	},
	{
		id: 13,
		name: 'maternidad',
		icon: '👩‍🦰',
	},
	{
		id: 14,
		name: 'blog',
		icon: '📝',
	},
]
