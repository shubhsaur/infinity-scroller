import { Suspense, useCallback, useState } from 'react';
import './App.css'
import { InputText } from 'primereact/inputtext';
import InfinityScroller from './components/InfinityScroller';
import { ProgressSpinner } from 'primereact/progressspinner';
        

function App() {
  const [query, setQuery] = useState('');

  const renderItem = useCallback(( {title}, key, ref) => <div className='list-item' key={key} ref={ref}>{title}</div>);

  return (
    <>
    <h1>Infinity Scroller</h1>
    <div className='app'>
      
      <InputText name="search" id="search" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
      <InfinityScroller 
        renderListItem={renderItem}
        query={query}
      />
    </div>
    </>
  )
}

export default App
