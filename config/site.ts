export const siteConfig = {
	name: 'Finance Tracker',
	description:
		'Personal finance management application with budget tracking, analytics, and recurring transactions',
	url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
	links: {
		github: 'https://github.com/yourusername/finance-tracker',
	},
}

export type SiteConfig = typeof siteConfig
