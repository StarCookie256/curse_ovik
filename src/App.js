import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main';
import PerfumeryHeader from './components/perfumeryHeader/perfumeryHeader';
import SearchPage from './pages/search/search';
import PerfumeryFooter from './components/perfumeryFooter/perfumeryFooter';

function App() {
  return (
    <Router>
      <div className="App">
        <PerfumeryHeader />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        <PerfumeryFooter />
      </div>
    </Router>
  );
}

export default App;
