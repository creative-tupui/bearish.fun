import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@layouts/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import WalletProvider from '@contexts/WalletProvider';

function App() {
  return (
    <div className="App">
      <WalletProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </WalletProvider>
    </div>
  )
}

export default App
