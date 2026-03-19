import { useState } from 'react';
import './UserById.css';

function UserById() {
    const [searchId, setSearchId] = useState('')
    const [user, setUser] = useState(null)

    async function buscar() {
        const res = await fetch('http://localhost:3000/users/' + searchId)
        const data = await res.json()
        setUser(data)
    }

    return (
        <div className="search-container">
            <h2>Buscar Usuario</h2>
            <input
                type="number"
                placeholder="ID do Usuario"
                onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={buscar}>Pesquisar</button>
            <div className="result">
                {user ? (
                    <div>
                        <p><strong>Nome:</strong> {user.nome}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>CPF:</strong> {user.cpf}</p>
                        <p><strong>Telefone:</strong> {user.telefone}</p>
                        <p><strong>Cidade:</strong> {user.cidade}</p>
                        <p><strong>Estado:</strong> {user.estado}</p>
                    </div>
                ) : (
                    <p>Nenhum usuario encontrado</p>
                )}
            </div>
        </div>
    )
}

export default UserById;