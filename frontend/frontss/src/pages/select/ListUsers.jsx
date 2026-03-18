import { useEffect, useState } from 'react'
function ListUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/users').then(res => res.json()).then(data => setUsers(data))
    }, [])
    return (<div>
        <h1>Usuarios</h1>
        {users.map(user => (
            <div key={user.id}>
                {user.nome} - {user.email}
            </div>
        ))}
    </div>)
}
export default ListUsers