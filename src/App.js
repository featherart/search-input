import React from 'react'
import { SearchInput } from './SearchInput'
import { labels } from './labels'

function App() {
  return (
    <div>
      <header className='app-header'>SearchVille Part II</header>
      <div className='content'>
        <SearchInput placeholder={'Search ...'} labels={labels} />
      </div>
    </div>
  )
}

export default App
