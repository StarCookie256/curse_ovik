import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './pages/main';

function App() {
  return (
    <Routes>
      <div className="App">
          <Router>
            <Route path="/" element={<MainPage />}/>
          </Router>
      </div>
    </Routes>
  );
}

export default App;
