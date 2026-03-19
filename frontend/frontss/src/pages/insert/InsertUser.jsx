import { useState } from 'react'
import './InsertUser.css';

function InsertUser() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    async function salvar() {
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, dataNascimento, telefone, cidade, estado })
        })
        alert('Usuario cadastrado')
    }

    return (
        <div className="insert-container">
            <h1>Novo Usuario</h1>
            <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />
            <input placeholder="Data de Nascimento" type="date" onChange={(e) => setDataNascimento(e.target.value)} />
            <input placeholder="Telefone" onChange={(e) => setTelefone(e.target.value)} />
            <input placeholder="Cidade" onChange={(e) => setCidade(e.target.value)} />
            <input placeholder="Estado" onChange={(e) => setEstado(e.target.value)} />
            <button onClick={salvar}>Salvar</button>
        </div>
    )
}

export default InsertUser