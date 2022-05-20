import './App.css';
import { ProductList } from './features/products/ProductList';
import { Header } from './components/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <ProductList />
        {/* <TmpComponentUseMemo /> */}
        {/* <UseMemoExample /> */}
        {/* <UseRefExample /> */}
        {/* <UseLayoutEffectExample /> */}
      </header>
    </div>
  );
}

export default App;
