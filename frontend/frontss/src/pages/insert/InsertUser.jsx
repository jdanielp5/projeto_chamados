import { useState } from 'react'
function InsertUser() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    async function salvar() {
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf })
        })
        alert('Usuario cadastrado')
    }
    return (<div>
        <h1>Novo Usuario</h1>
        <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="CPF" onChange={(e) => setCpf(e.target.value)} />
        <button onClick={salvar}>Salvar</button>
    </div>)
}
export default InsertUser