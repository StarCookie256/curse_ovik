import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
