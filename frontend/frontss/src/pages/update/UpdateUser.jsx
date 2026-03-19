import { useState } from 'react';
import './UpdateUser.css';

function UpdateUser() {
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    async function atualizar() {
        await fetch('http://localhost:3000/users/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, telefone, cidade, estado })
        })
        alert('Usuario atualizado')
    }

    return (
        <div className="update-form">
            <h2>Editar Cadastro</h2>
            <label>ID do Usuario:</label>
            <input type="number" onChange={(e) => setId(e.target.value)} />
            <label>Novo Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            <label>Novo E-mail:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            <label>Cidade:</label>
            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            <label>Estado:</label>
            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
            <button onClick={atualizar}>Salvar Alteracoes</button>
        </div>
    )
}

export default UpdateUser;