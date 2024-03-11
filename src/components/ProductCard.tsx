import { FC, useState } from 'react'
import { Product } from '../api/products.service'
import DeleteModal from './DeleteModal'

interface ProductCardProps {
	product: Product
	onClick: () => void
}

const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
	const [modal, setModal] = useState<boolean>(false)

	const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation()
		setModal(true)
	}

	return (
		<>
			{modal && (
				<DeleteModal
					setVisible={setModal}
					id={product.id!}
					productName={product.name}
				/>
			)}
			<div
				className='border border-gray-200 shadow-md w-full rounded-xl flex flex-col items-center justify-center cursor-pointer'
				onClick={onClick}
			>
				<div className='relative'>
					<img
						src={product.imageUrl}
						alt='Product Image'
						className='rounded-xl'
					/>
					<button
						className='absolute top-2 right-2 bg-red-400 rounded py-2 px-3'
						onClick={handleOpenModal}
					>
						Delete
					</button>
				</div>
				<h1 className='text-md font-medium py-2'>{product.name}</h1>
			</div>
		</>
	)
}

export default ProductCard
