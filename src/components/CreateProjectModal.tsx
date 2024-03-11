import { FC, useState } from 'react'
import { productsService } from '../api/products.service'
import toast from 'react-hot-toast'

interface CreateProjectModalProps {
	setVisible: (visible: boolean) => void
}

interface ProjectFormData {
	imageUrl: string
	name: string
	count: number
	width: number
	height: number
	weight: string
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ setVisible }) => {
	const [formData, setFormData] = useState<ProjectFormData>({
		imageUrl: '',
		name: '',
		count: 0,
		width: 0,
		height: 0,
		weight: '',
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]:
				name === 'count' || name === 'width' || name === 'height'
					? parseInt(value)
					: value,
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const productToCreate = {
			imageUrl: formData.imageUrl,
			name: formData.name,
			count: formData.count,
			size: {
				width: formData.width,
				height: formData.height,
			},
			weight: formData.weight,
		}

		try {
			await productsService.createProduct(productToCreate)
			console.log('Product created successfully!')
			setFormData({
				imageUrl: '',
				name: '',
				count: 0,
				width: 0,
				height: 0,
				weight: '',
			})
			setVisible(false)
			toast.success('Project created successfully')
		} catch (error) {
			console.error('Error creating product:', error)
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
				<h1 className='text-xl font-semibold text-center'>Create Project</h1>
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
							value={formData.width}
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
							value={formData.height}
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
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateProjectModal
