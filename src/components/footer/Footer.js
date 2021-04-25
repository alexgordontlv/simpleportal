import React, { useState } from 'react';
import { useModalContext } from '../../context/modal.context';
const Footer = () => {
	const [link, setLink] = useState('');
	const [fetching, setFetching] = useState(false);
	const { setOpenModal } = useModalContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!link) {
			setOpenModal('Please provide a valid email');
			return;
		}
		setFetching(false);
	};

	return (
		<div className=' mt-10'>
			<div className='flex-col w-full'>
				<div className=' '>
					<form onSubmit={handleSubmit} className='flex '>
						<input
							value={link}
							type='text'
							onChange={(e) => setLink(e.target.value)}
							className={` border-solid border w-11/12 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
							placeholder='Enter email to get more info'
						/>
						<button type='submit' className={` bg-black text-white px-3 py-2 rounded w-36  hover:bg-gray-800 ml-3`}>
							{fetching ? <p className='animate-pulse'>Please wait... </p> : 'Submit'}
						</button>
					</form>
				</div>
				<div className='flex text-center justify-evenly w-full mt-10'>
					<p>LinkedIn</p> .<p>FaceBook</p> .<p>Instragram</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
