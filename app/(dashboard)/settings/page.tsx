import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					Manage your account and preferences
				</p>
			</div>

			<div className='grid gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Profile</CardTitle>
						<CardDescription>Update your profile information</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<Label>Name</Label>
							<p className='text-sm text-gray-500 mt-1'>Demo User</p>
						</div>
						<div>
							<Label>Email</Label>
							<p className='text-sm text-gray-500 mt-1'>demo@example.com</p>
						</div>
						<Button variant='outline'>Edit Profile</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Notifications</CardTitle>
						<CardDescription>
							Configure notification preferences
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='flex items-center justify-between'>
							<div>
								<Label>Email Notifications</Label>
								<p className='text-sm text-gray-500'>Receive email updates</p>
							</div>
							<div className='text-sm text-gray-500'>Enabled</div>
						</div>
						<div className='flex items-center justify-between'>
							<div>
								<Label>Budget Alerts</Label>
								<p className='text-sm text-gray-500'>
									Get notified when approaching limits
								</p>
							</div>
							<div className='text-sm text-gray-500'>Enabled</div>
						</div>
						<div className='flex items-center justify-between'>
							<div>
								<Label>Weekly Digest</Label>
								<p className='text-sm text-gray-500'>Weekly spending summary</p>
							</div>
							<div className='text-sm text-gray-500'>Enabled</div>
						</div>
						<Button variant='outline'>Manage Notifications</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Categories</CardTitle>
						<CardDescription>Manage transaction categories</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-sm text-gray-500 mb-4'>
							You have 16 default categories
						</p>
						<Button variant='outline'>Manage Categories</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
