import { useCallback, useState } from 'react';
import './App.css'
import { InputText } from 'primereact/inputtext';
import InfinityScroller from './components/InfinityScroller';
        

function App() {
  const [query, setQuery] = useState('');

  const renderItem = useCallback(( {title}, key, ref) => <div key={key} ref={ref}>{title}</div>);

  return (
    <>
      <InputText name="search" id="search" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />

      <InfinityScroller 
        renderListItem={renderItem}
        query={query}
      />
    </>
  )
}

export default App
