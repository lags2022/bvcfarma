import { UserModelConstructor } from './models'

export interface UserControllerImplements
	extends Omit<UserModelConstructor, 'new'> {}
