import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { AppRouter } from './app-router.tsx';

createRoot(document.getElementById('root')!).render(<AppRouter />);
