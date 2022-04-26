import './App.css'
import TickerCard from './components/TickerCard'
import { Container } from 'reactstrap'
import SearchBar from './components/SearchBar'
import { useSelector } from 'react-redux'

function App() {
  // @ts-ignore
  const monList = useSelector((state) => state.value)

  return (
    <div className="App">
      <header className="header">
        <SearchBar />
      </header>
      <main className="App-content">
        <Container style={{ marginTop: 40, paddingTop: 10, height: '100%' }}>
          {monList.map((ele, index) => {
            return <TickerCard key={index} symbol={ele.symbol} displayName={ele.displayName} />
          })}
        </Container>
      </main>
    </div>
  )
}

export default App
