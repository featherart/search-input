import React from 'react'
import { FiX } from 'react-icons/fi'
import './tag.css'

export const Tag = ({ children, onClick, onMouseEnter }) => (
	<span className='ui tag' onClick={onClick} onMouseEnter={onMouseEnter}>
		{children}
		<FiX />
	</span>
)
