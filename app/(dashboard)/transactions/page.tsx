import { Suspense } from 'react'
import TransactionsPageContent from './transactions-page-content'

export default function TransactionsPage() {
	return (
		<Suspense fallback={<div className='p-8'>Loading...</div>}>
			<TransactionsPageContent />
		</Suspense>
	)
}
