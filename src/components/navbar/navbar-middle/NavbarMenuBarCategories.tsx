import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

export const NavbarMenuBarCategories = () => {
	return (
		<Drawer direction="left">
			<DrawerTrigger className='sm:hidden p-2 text-picker-4 hover:bg-gray-100 rounded-sm transition duration-300 ease hover:text-picker-4'>
				{/* <Button
					variant="ghost"
					className=" sm:hidden p-2 text-picker-4 hover:text-picker-4"
				> */}
				<Menu className="" />
				{/* </Button> */}
			</DrawerTrigger>
			<DrawerContent className='sm:hidden top-0 right-0 w-screen max-w-80 !h-full rounded-none mt-0 first:*:hidden'>
				<DrawerHeader>
					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button>Submit</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
