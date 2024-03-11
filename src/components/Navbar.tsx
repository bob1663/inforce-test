import { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateProjectModal from './CreateProjectModal'

const Navbar = () => {
	const [modal, setModal] = useState<boolean>(false)

	return (
		<>
			{modal && <CreateProjectModal setVisible={setModal} />}
			<nav className='border-b border-grey-300 shadow-sm w-full flex items-center px-5 py-3 justify-between'>
				<Link to='/products' className='font-bold text-3xl uppercase'>
					Test task
				</Link>
				<h1 className='font-medium text-2xl' onClick={() => setModal(true)}>
					Create project
				</h1>
			</nav>
		</>
	)
}

export default Navbar
