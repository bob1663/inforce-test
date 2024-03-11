import { AxiosResponse } from 'axios'
import { axiosInstance } from './instance'

export interface Comment {
	id?: string
	productId: number
	description: string
	date: string
}

interface CommentsService {
	getComments: (productId: number) => Promise<Comment[]>
	deleteComment: (commentId: string) => Promise<void>
	createComment: (comment: Comment) => Promise<void>
}

export const commentsService: CommentsService = {
	getComments: async (productId: number): Promise<Comment[]> => {
		const response: AxiosResponse<Comment[]> = await axiosInstance.get(
			`comments?productId=${productId}`
		)
		return response.data
	},

	deleteComment: async (commentId: string): Promise<void> => {
		await axiosInstance.delete(`comments/${commentId}`)
	},

	createComment: async (comment: Comment): Promise<void> => {
		await axiosInstance.post('comments', comment)
	},
}
