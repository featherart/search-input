import React, { useState, useEffect } from 'react'
import { Tag } from '../Tag'
import { FiPlusSquare, FiXSquare, FiX, FiFilter, FiSmile } from 'react-icons/fi'
import './search-input.css'

const labels = [
	{ name: 'Name', value: 'cuda' },
	{ name: 'Latest Tag', value: '1.0' },
	{ name: 'Size', value: [ 'large', 'medium', 'small' ] },
	{ name: 'Module', value: 'cuda' },
	{ name: 'Library', value: '1.0' },
	{ name: 'Spec', value: [ 'large', 'medium', 'small' ] }
]

export const SearchInput = () => {
  const [ value, setValue ] = useState('')
  const [ tags, setTags ] = useState([])
  const [ labelsOpen, toggleLabels ] = useState(false)
  const addToTags = (label) => {
    if (!tags.includes(label)) setTags([...tags, label])
  }

  const removeFromTags = (tag, i) => {
    tags.splice(i, 1)
    setTags([...tags])
  }

  const clearAll = () => {
    setTags([])
    setValue('')
  }

  const placeholder = (tags.length || value) ? '' : 'search...'
  return (
    <div className='input-filter'>
      {labelsOpen ? (
					<div>
						<FiXSquare className='open-close-icon' onClick={() => toggleLabels(!labelsOpen)} />
						<div className='search-input-label-container'>
							{labels.map((label, i) => (
								<span key={i} onClick={() => addToTags(label.name)}>
									<FiSmile className='label-icon'/>{label.name}
								</span>
							))}
						</div>
					</div>
				) : (
					<div>
						<FiPlusSquare className='open-close-icon' onClick={() => toggleLabels(!labelsOpen)} />
					</div>
        )}
      <div className='inner'>
        {tags.map((tag, i) => {
          return (
            <Tag onClick={() => removeFromTags(tag, i)} key={i}>
              {tag}
            </Tag>
          )
        })}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <FiX className='close-icon' onClick={() => clearAll()} name='close-fill' />
    </div>
  )
}
