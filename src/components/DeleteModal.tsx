import { FC } from 'react'
import { productsService } from '../api/products.service'
import toast from 'react-hot-toast'

interface DeleteModalProps {
	setVisible: (visible: boolean) => void
	id: string
	productName: string
}

const DeleteModal: FC<DeleteModalProps> = ({
	setVisible,
	id,
	productName,
}) => {
	const deleteProject = async () => {
		try {
			await productsService.deleteProduct(id)
			setVisible(false)
			toast.success(`${productName} deleted successfully`)
		} catch (error) {
			console.error(error)
			toast.error('Something went wrong')
		}
	}
	return (
		<div
			className='fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50'
			onClick={() => setVisible(false)}
		>
			<div
				className='bg-white p-5 rounded-lg flex flex-col gap-5'
				onClick={e => e.stopPropagation()}
			>
				<h1 className='text-xl font-semibold text-center'>Confirm Deletion</h1>
				<p>
					Are you sure you want to delete{' '}
					<span className='font-bold'>{productName}</span>?
				</p>
				<div className='flex justify-end space-x-2 mt-4'>
					<button
						onClick={() => setVisible(false)}
						className='py-2 px-4 bg-gray-200 rounded'
					>
						Cancel
					</button>
					<button
						onClick={deleteProject}
						className='py-2 px-4 bg-red-500 text-white rounded'
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal
