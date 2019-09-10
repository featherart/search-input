import React from 'react'
import { FiX } from 'react-icons/fi'
import './tag.css'

export const Tag = ({
  children,
  close,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => (
  <span
    className='ui tag'
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
    <FiX onClick={close} />
  </span>
)
