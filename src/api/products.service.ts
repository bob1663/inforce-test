import { AxiosResponse } from 'axios'
import { axiosInstance } from './instance'

export interface Product {
	id?: string
	imageUrl: string
	name: string
	count: number
	size: {
		width: number
		height: number
	}
	weight: string
}

interface ProductsService {
	getProducts: () => Promise<Product[]>
	deleteProduct: (productId: string) => Promise<void>
	createProduct: (product: Product) => Promise<void>
	editProduct: (productId: string, product: Product) => Promise<void>
}

export const productsService: ProductsService = {
	getProducts: async (): Promise<Product[]> => {
		const response: AxiosResponse<Product[]> = await axiosInstance.get(
			'products'
		)
		return response.data
	},

	deleteProduct: async (productId: string): Promise<void> => {
		await axiosInstance.delete(`products/${productId}`)
	},

	createProduct: async (product: Product): Promise<void> => {
		await axiosInstance.post('products', product)
	},
	editProduct: async (productId: string, product: Product): Promise<void> => {
		await axiosInstance.put(`products/${productId}`, product)
	},
}
