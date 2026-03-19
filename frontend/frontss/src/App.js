import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

import Login from './pages/login/Login';
import Home from './pages/section/Home';
import InsertUser from './pages/insert/InsertUser';
import ListUsers from './pages/select/ListUsers';
import CreateTicket from './pages/chamados/CreateTicket';
import ListTickets from './pages/chamados/ListTickets';
import EditTicket from './pages/chamados/EditTicket';
import DeleteUser from './pages/deletar/DeleteUser';
import UserById from './pages/select_id/UserById';
import UpdateUser from './pages/update/UpdateUser';

function Layout() {
  const location = useLocation();
  const isLogin = location.pathname === '/';

  return (
    <>
      {!isLogin && <Header />}
      {!isLogin && <Nav />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/insert" element={<InsertUser />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/ticket" element={<CreateTicket />} />
        <Route path="/tickets" element={<ListTickets />} />
        <Route path="/edit-ticket/:id" element={<EditTicket />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/user-id" element={<UserById />} />
        <Route path="/update-user" element={<UpdateUser />} />
      </Routes>

      {!isLogin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;