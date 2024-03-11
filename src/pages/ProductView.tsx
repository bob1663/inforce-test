import { useLocation } from 'react-router-dom'
import { Product } from '../api/products.service'
import { useEffect, useState } from 'react'
import EditProjectModal from '../components/EditProjectModal'
import { commentsService, Comment } from '../api/comment.service'

const ProductView = () => {
	const location = useLocation()
	const [modal, setModal] = useState<boolean>(false)
	const [comments, setComments] = useState<Comment[]>([])
	const [newCommentDescription, setNewCommentDescription] = useState<string>('')
	const [product, setProduct] = useState<Product | null>(
		location.state?.product as Product
	)

	const handleSave = (updatedProduct: Product) => {
		setProduct(updatedProduct)
		setModal(false)
	}

	useEffect(() => {
		const fetchComments = async () => {
			if (product && product.id !== undefined) {
				const productId = Number(product.id)

				if (!isNaN(productId)) {
					const fetchedComments = await commentsService.getComments(productId)
					setComments(fetchedComments)
				}
			}
		}

		fetchComments()
	}, [product])

	const handleDeleteComment = async (commentId: string) => {
		try {
			await commentsService.deleteComment(commentId)
			setComments(comments.filter(comment => comment.id !== commentId))
		} catch (error) {
			console.error('Failed to delete the comment:', error)
		}
	}

	const handleAddComment = async (e: React.FormEvent) => {
		e.preventDefault()
		if (
			product &&
			product.id !== undefined &&
			newCommentDescription.trim() !== ''
		) {
			const newComment: Comment = {
				productId: Number(product.id),
				description: newCommentDescription,
				date: new Date().toISOString(),
			}
			try {
				await commentsService.createComment(newComment)
				setComments([...comments, { ...newComment, id: `temp-${Date.now()}` }])
				setNewCommentDescription('')
			} catch (error) {
				console.error('Failed to add the comment:', error)
			}
		}
	}

	if (!product) {
		return <div>Product not found.</div>
	}
	return (
		<>
			{modal && (
				<EditProjectModal
					setVisible={setModal}
					product={product}
					onSave={handleSave}
				/>
			)}
			<div className='w-full flex p-5 items-start justify-between gap-10 md:flex-row flex-col'>
				<img src={product.imageUrl} alt='Product image' />
				<div className='flex flex-col gap-5 w-full justify-start'>
					<h1 className='text-3xl'>Name: {product.name}</h1>
					<h2>Count: {product.count}</h2>
					<h2>Weight: {product.weight}</h2>
					<h2>Width: {product.size.width}</h2>
					<h2>Height: {product.size.height}</h2>
					<button
						className='border-black border px-3 py-2 text-center'
						onClick={() => setModal(true)}
					>
						Edit
					</button>
				</div>
			</div>
			<div className='flex w-full flex-col gap-5 px-5'>
				<div className='w-full flex items-center justify-between'>
					<h1 className='mb-5 font-2xl font-semibold'>Comments:</h1>
					<form className='flex flex-col gap-2' onSubmit={handleAddComment}>
						<input
							type='text'
							className='input border border-black'
							value={newCommentDescription}
							onChange={e => setNewCommentDescription(e.target.value)}
						/>
						<button className='border border-black py-2 px-3' type='submit'>
							Add comment
						</button>
					</form>
				</div>
				{comments.map(comment => (
					<div
						key={comment.id}
						className='border-black p-5 border flex w-full items-center justify-between'
					>
						<div className='flex flex-col gap-5'>
							<p>{comment.description}</p>
							<p>{comment.date}</p>
						</div>
						<button
							className='border border-black py-2 px-3 bg-red-400'
							onClick={() => handleDeleteComment(comment.id!)}
						>
							Delete
						</button>
					</div>
				))}
			</div>
		</>
	)
}

export default ProductView
