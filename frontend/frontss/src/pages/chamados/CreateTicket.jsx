import { useState } from 'react'
function CreateTicket() {
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('baixo')
    async function salvar() {
        await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao, categoria, data: new Date() })
        })
        alert('Chamado criado')
    }
    return (<div>
        <h1>Novo Chamado</h1>
        <textarea onChange={(e) => setDescricao(e.target.value)} />
        <select onChange={(e) => setCategoria(e.target.value)}> <option>baixo</option> <option>medio</
        option> <option>urgente</option> </select>
        <button onClick={salvar}>Criar</button>
    </div>)
}
export default CreateTicket