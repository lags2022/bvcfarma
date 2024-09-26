import { AuthLogin } from '@/components/auth/AuthLogin'
import { AuthRegister } from '@/components/auth/AuthRegister'

export default function LoginPage() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
				{/* login */}
				<AuthLogin />

				{/* register */}
				<AuthRegister />
			</div>
		</div>
	)
}
