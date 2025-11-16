import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main';
import PerfumeryHeader from './components/perfumeryHeader/perfumeryHeader';
import SearchPage from './pages/search/search';
import PerfumeryFooter from './components/perfumeryFooter/perfumeryFooter';
import LoginPage from './pages/login/LoginPage';
import CabinetPage from './pages/cabinet/CabinetPage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import CatalogPage from './pages/catalog/CatalogPage';
import BrandPage from './pages/brandPage/BrandPage';
import ProductPage from './pages/productPage/ProductPage';
import BasketPage from './pages/basketPage/BasketPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
  // const hideDecorRoutes = ["/login"]; // страницы, где скрываем декор всякий
  // const shouldHideDecor = hideDecorRoutes.includes(location.pathname);

  return (
    <Router>
      <div className="App">
        <PerfumeryHeader />
        <div className="main-content">
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<MainPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:brandId" element={<BrandPage />} />
            <Route path="/catalog/:brandId/:productId" element={<ProductPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/cabinet"
              element={
                <ProtectedRoute requireAuth={true}>
                  <CabinetPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/basket"
              element={
                <ProtectedRoute requireAuth={true}>
                  <BasketPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <PerfumeryFooter />
      </div>
    </Router>
  );
}

export default App;