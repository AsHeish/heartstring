import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CreatePage } from './pages/CreatePage';
import { ValentinePage } from './pages/ValentinePage';
import { HomePage } from './pages/HomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - choose to create or view demo */}
        <Route path="/" element={<HomePage />} />

        {/* Create page - for boys to fill in details */}
        <Route path="/create" element={<CreatePage />} />

        {/* Valentine page - for girls to view their personalized experience */}
        <Route path="/love/:id" element={<ValentinePage />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
