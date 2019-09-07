import React from 'react'
import { FiX } from 'react-icons/fi'
import './tag.css'

export const Tag = ({ children, onClick }) => (
<span className='ui tag' onClick={onClick}>
  {children}
  <FiX />
</span>
)
