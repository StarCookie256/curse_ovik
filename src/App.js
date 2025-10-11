import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';
import PerfumeryHeader from './components/perfumeryHeader/perfumeryHeader';

function App() {
  return (
    <Router>
      <div className="App">
        <PerfumeryHeader />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
