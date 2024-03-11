import { FC, useState } from 'react'
import { Product, productsService } from '../api/products.service'
import toast from 'react-hot-toast'

interface EditProjectModalProps {
	product: Product
	setVisible: (visible: boolean) => void
	onSave: (updatedProduct: Product) => void
}

const EditProjectModal: FC<EditProjectModalProps> = ({
	setVisible,
	product,
	onSave,
}) => {
	const [formData, setFormData] = useState<Product>(product)
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (name === 'count' || name === 'width' || name === 'height') {
			setFormData({
				...formData,
				size: {
					...formData.size,
					[name]: parseInt(value) || 0,
				},
			})
		} else {
			setFormData({
				...formData,
				[name]: value,
			})
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await productsService.editProduct(product.id || '', formData)
			toast.success('Project saved successfully!')
			setVisible(false)
			onSave(formData)
		} catch (error) {
			console.error('Error editing project:', error)
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
				<h1 className='text-xl font-semibold text-center'>Edit Project</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<div className='flex items-center gap-2'>
						<p>ImageURL: </p>
						<input
							placeholder='Image URL'
							name='imageUrl'
							type='text'
							value={formData.imageUrl}
							onChange={handleInputChange}
							className='input'
						/>
					</div>
					<div className='flex items-center gap-2'>
						<p>Product Name: </p>
						<input
							placeholder='Product Name'
							name='name'
							type='text'
							value={formData.name}
							onChange={handleInputChange}
							className='input'
						/>
					</div>
					<div className='flex items-center gap-2'>
						<p>Count: </p>
						<input
							placeholder='Count'
							name='count'
							type='number'
							value={formData.count}
							onChange={handleInputChange}
							className='input'
						/>
					</div>
					<div className='flex items-center gap-2'>
						<p>Width: </p>
						<input
							placeholder='Width'
							name='width'
							type='number'
							value={formData.size.width}
							onChange={handleInputChange}
							className='input flex-1'
						/>
					</div>
					<div className='flex items-center gap-2'>
						<p>Height: </p>
						<input
							placeholder='Height'
							name='height'
							type='number'
							value={formData.size.height}
							onChange={handleInputChange}
							className='input flex-1'
						/>
					</div>
					<div className='flex items-center gap-2'>
						<p>Weight: </p>
						<input
							placeholder='Weight'
							name='weight'
							type='text'
							value={formData.weight}
							onChange={handleInputChange}
							className='input'
						/>
					</div>
					<div className='flex justify-end gap-2'>
						<button
							type='button'
							onClick={() => setVisible(false)}
							className='py-2 px-4 bg-gray-200 rounded'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='py-2 px-4 bg-blue-500 text-white rounded'
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditProjectModal
