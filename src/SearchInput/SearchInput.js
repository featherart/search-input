import React, { useState } from 'react'
import { Tag } from '../Tag'
import { FiPlusSquare, FiXSquare, FiX, FiFilter, FiSmile } from 'react-icons/fi'
import './search-input.css'

const labels = [
  { name: 'Name', value: 'cuda' },
  { name: 'Latest Tag', value: '1.0' },
  { name: 'Size', value: [ 'large', 'medium', 'small' ] },
  {
    name: 'Module',
    value: [ 'cuda', 'tigah', 'bearah', 'scorpion', 'killah' ]
  },
  { name: 'Library', value: [ 'books', 'cooks', 'wookies' ] },
  { name: 'Spec', value: [ 'beer', 'cider', 'vodka', 'wine' ] }
]

export const SearchInput = () => {
  const [ value, setValue ] = useState('')
  const [ listValues, setListValues ] = useState([])
  const [ listOpen, setListOpen ] = useState('')
  const [ tags, setTags ] = useState([])
  const [ labelsOpen, toggleLabels ] = useState(false)

  const addToTags = label => {
    if (!tags.includes(label)) setTags([ ...tags, label ])
  }

  const removeFromTags = (tag, i) => {
    tags.splice(i, 1)
    setTags([ ...tags ])
  }

  const clearAll = () => {
    setTags([])
    setValue('')
  }

  const handleTagList = (tag, i) => {
    const val = labels.find(label => label.name === tag)
    setListValues(val && val.value)
    return (listOpen === i) ? setListOpen('') : setListOpen(i)
  }

  // only show placeholder if there are tags or values 
  const placeholder = tags.length || value ? '' : 'search...'
  return (
    <div className='input-filter-wrapper'>
      <FiFilter className='filter-icon' />
      <div className='input-filter'>
        {labelsOpen ? (
          <div>
            <FiXSquare
              className='open-close-icon'
              onClick={() => toggleLabels(!labelsOpen)}
            />
            <div className='search-input-label-container'>
              {labels.map((label, i) => (
                <span key={i} onClick={() => addToTags(label.name)}>
                  <FiSmile className='label-icon' />
                  {label.name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <FiPlusSquare
              className='open-close-icon'
              onClick={() => toggleLabels(!labelsOpen)}
            />
          </div>
        )}
        <div className='inner'>
          {tags.map((tag, i) => {
            return (
              <div className='tags-area' key={i}>
                <Tag
                  onClick={() => handleTagList(tag, i)}
                  close={() => removeFromTags(tag, i)}
                >
                  {tag}
                </Tag>
                <div className='list-values'>
                  {listOpen === i &&
                    (Array.isArray(listValues) ? (
                      listValues.map((li, j) => <div key={j}>{li}</div>)
                    ) : (
                      <div>{listValues}</div>
                    ))}
                </div>
              </div>
            )
          })}
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <FiX
          className='close-icon'
          onClick={() => clearAll()}
          name='close-fill'
        />
      </div>
    </div>
  )
}
