import { useState } from 'react';
import './DeleteUser.css';

function DeleteUser() {
    const [id, setId] = useState('')

    async function deletar() {
        await fetch('http://localhost:3000/users/' + id, {
            method: 'DELETE'
        })
        alert('Usuario ' + id + ' removido com sucesso!')
    }

    return (
        <div className="delete-container">
            <h2>Excluir Usuario</h2>
            <input
                type="text"
                placeholder="Digite o ID do usuario"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={deletar}>Confirmar Exclusao</button>
        </div>
    )
}

export default DeleteUser;