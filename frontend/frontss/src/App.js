import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'; 
import Home from './pages/section/Home';
import InsertUser from './pages/insert/InsertUser';
import ListUsers from './pages/select/ListUsers';
import CreateTicket from './pages/chamados/CreateTicket';
import ListTickets from './pages/chamados/ListTickets';
function App() {
  return (<BrowserRouter> <Routes>

    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/insert" element={<InsertUser />} />
    <Route path="/users" element={<ListUsers />} />
    <Route path="/ticket" element={<CreateTicket />} />
    <Route path="/tickets" element={<ListTickets />} />

  </Routes> </BrowserRouter>)
}
export default App