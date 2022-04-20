import { Header } from './components/Header';
import { ProductList } from './features/products/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <ProductList />
      </header>
    </div>
  );
}

export default App;
