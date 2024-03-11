import { useEffect, useState } from 'react'
import { Product, productsService } from '../api/products.service'
import ProductCard from '../components/ProductCard'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [products, setProducts] = useState<Product[]>([])
	const [error, setError] = useState<string | null>(null)
	const [sortOption, setSortOption] = useState<string>('name')
	const navigate = useNavigate()

	const fetchProducts = async () => {
		try {
			setLoading(true)
			setError(null)
			const fetchedProducts = await productsService.getProducts()
			const sortedProducts = sortProducts(fetchedProducts, 'name')
			setProducts(sortedProducts)
		} catch (error) {
			console.error('Error fetching products', error)
			setError('Failed to fetch products. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	useEffect(() => {
		setProducts(prevProducts => sortProducts(prevProducts, sortOption))
	}, [sortOption])

	const sortProducts = (products: Product[], option: string) => {
		return products.slice().sort((a, b) => {
			if (option === 'name') {
				return a.name.localeCompare(b.name)
			} else if (option === 'count') {
				return a.count - b.count
			}
			return 0
		})
	}

	const handleProductClick = (product: Product) => {
		navigate(`/products/${product.id}`, { state: { product } })
	}

	if (loading) {
		return <div className='w-full text-center mt-10'>Loading...</div>
	}

	if (error) {
		return (
			<div className='flex items-center justify-center gap-5 flex-col mt-10'>
				<p>{error}</p>
				<button
					onClick={fetchProducts}
					className='border border-gray-300 py-2 px-5 rounded'
				>
					Retry
				</button>
			</div>
		)
	}

	return (
		<div className='w-full flex flex-col items-center justify-center p-5'>
			<div>
				<select
					onChange={e => setSortOption(e.target.value)}
					value={sortOption}
					className='border border-gray-300 py-2 px-3 rounded mb-5'
				>
					<option value='name'>Sort by Name</option>
					<option value='count'>Sort by Count</option>
				</select>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{products.map(product => (
					<ProductCard
						product={product}
						key={product.id}
						onClick={() => handleProductClick(product)}
					/>
				))}
			</div>
		</div>
	)
}

export default ProductList
