import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import WalletProvider from './contexts/WalletProvider';
import { WalletBalanceProvider } from './contexts/WalletBalanceContext';

function App() {
  return (
    <div className="App">
      <WalletProvider>
      <WalletBalanceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        </WalletBalanceProvider>
      </WalletProvider>
    </div>
  )
}

export default App
