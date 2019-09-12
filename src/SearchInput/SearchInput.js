import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Tag } from '../Tag'
import { FiPlusSquare, FiXSquare, FiX, FiFilter, FiSmile } from 'react-icons/fi'
import { useLocalStorage } from '../useLocalStorage'
import './search-input.css'

export const SearchInput = ({ placeholder, labels }) => {
  // value is the overall collection of search values
  // this is what will be submitted to the api for filtering/search
  const [ value, setValue ] = useState('')

  // this is the list of inner values for tags
  const [ listValues, setListValues ] = useState([])

  // this is initialized with a null string but it will be set to the
  // index value of the tag with a list that is currently open
  const [ listIndexOpen, setListIndexOpen ] = useState('')

  const [ tags, setTags ] = useState([])
  const [ labelsOpen, toggleLabels ] = useState(false)

  // values get set in local storage in a collection
  // getSearchValues is not currently being used but it will
  // be necessary to use it for loading up a users search preferences
  const [ , setSearchValues, getSearchValues ] = useLocalStorage(
    'ngc::searchvalues'
  )

  // adds label to search input & tags array when clicked
  const addToTags = label => {
    if (!tags.includes(label)) {
      setTags([ ...tags, label ])
      setSearchValues([ ...tags, label ])
    }
  }

  // removes tag from input when x clicked
  const removeFromTags = (tag, i) => {
    tags.splice(i, 1)
    setTags([ ...tags ])
    setSearchValues([ ...tags ])
  }

  // clears all tags and search inputs
  const clearAll = () => {
    setTags([])
    setValue('')
    setSearchValues('')
  }

  // opens the inner list of values
  // index is used to make sure list is opened for the correct tag
  const handleTagList = (tag, i) => {
    const val = labels.find(label => label.name === tag)
    setListValues(val && val.value)
    return listIndexOpen === i ? setListIndexOpen('') : setListIndexOpen(i)
  }

  // when an item in the list is clicked it should be added to the tag
  // the element is removed and replaced, preserving order of tags
  const handleListClick = (listItem, tag, index) => {
    tags.forEach((item, i) => {
      if (item === tag) {
        removeFromTags(item, i)
        const before = tags.slice(0, i)
        const after = tags.slice(i, tags.length)
        if (!tags.includes(`${tag} : ${listItem}`))
          setTags([ ...before, `${tag} : ${listItem}`, ...after ])
        setSearchValues([ ...before, `${tag} : ${listItem}`, ...after ])
      }
    })
    setListIndexOpen('')
  }

  // only show placeholder if there are tags or values
  const innerPlaceholder = tags.length || value ? '' : placeholder
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
            { ReactDOM.createPortal(
            <div>
              {labels.map((label, i) => (
                <span key={i} onClick={() => addToTags(label.name)}>
                  <FiSmile className='label-icon' />
                  {label.name}
                </span>
              ))}
            </div>, document.getElementById('list-values'))
            }
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
                  id={i}
                >
                  {tag}
                </Tag>
                <div>
                  {listIndexOpen === i &&
                    document.getElementById(i) &&
                    !tag.includes(':') &&
                    ReactDOM.createPortal(
                      <ListValuesComponent
                        handleClick={handleListClick}
                        tag={tag}
                        index={i}
                        listValues={listValues}
                      />,
                      document.getElementById(i)
                    )}
                </div>
              </div>
            )
          })}
          <input
            value={value}
            onChange={e => setValue(e && e.target && e.target.value)}
            placeholder={innerPlaceholder}
          />
        </div>
        <FiX
          className='close-icon'
          onClick={() => clearAll()}
          name='close-fill'
        />
      </div>
      <div id='list-values' className='search-input-label-container' />
    </div>
  )
}

const ListValuesComponent = ({ listValues, handleClick, tag, index }) => {
  return (
    <div className='inner-list-values'>
      {Array.isArray(listValues) ? (
        listValues.map((li, j) => (
          <div onClick={() => handleClick(li, tag, index)} key={j}>
            {li}
          </div>
        ))
      ) : (
        <div onClick={() => handleClick(listValues, tag, index)}>
          {listValues}
        </div>
      )}
    </div>
  )
}
