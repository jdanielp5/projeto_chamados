import { useEffect, useState } from 'react'
import './ListUsers.css';

function ListUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/users').then(res => res.json()).then(data => setUsers(data))
    }, [])

    return (
        <div className="users-list-container">
            <h1>Usuarios Cadastrados</h1>
            {users.length === 0 ? (
                <p>Nenhum usuario cadastrado.</p>
            ) : (
                users.map(user => (
                    <div key={user.id} className="user-item">
                        <span><strong>{user.nome}</strong> — {user.email}</span>
                        <span style={{ color: '#999', fontSize: '12px' }}>ID: {user.id}</span>
                    </div>
                ))
            )}
        </div>
    )
}

export default ListUsers
