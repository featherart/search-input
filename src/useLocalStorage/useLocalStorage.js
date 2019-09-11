import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [ items, setInnerValue] = useState([])

  const setValue = value => {
    setInnerValue([...value, items])
    window.localStorage.setItem(key, value)
  }

  const getValue = key => {
    window.localStorage.getItem(key)
  }

  return [ items, setValue, getValue ]
}
