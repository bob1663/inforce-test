import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductView from './pages/ProductView'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

const App = () => {
	return (
		<div>
			<Toaster />
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/products' element={<ProductList />} />
					<Route path='/products/:id' element={<ProductView />} />
					<Route path='*' element={<Navigate to='/products' replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
