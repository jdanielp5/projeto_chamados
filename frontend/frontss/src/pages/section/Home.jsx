import { Link } from 'react-router-dom'
function Home() {
    return (<div>
        <h1>Sistema de Chamados</h1>
        <Link to="/insert">Cadastrar Cliente</Link> 
        <br /> <Link to="/users">Listar Usuarios</Link>
        <br /><br />
        <Link to="/ticket">Criar Chamado</Link> <br /> <Link to="/tickets">Ver Chamados</Link>
    </div>)
}
export default Home