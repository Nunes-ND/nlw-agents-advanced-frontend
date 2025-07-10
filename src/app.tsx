import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateRoom } from './pages/create-room';
import { Room } from './pages/room';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CreateRoom />} path="/" />
        <Route element={<Room />} path="/rooms" />
      </Routes>
    </BrowserRouter>
  );
}
