import { useState, useEffect } from 'react'
import './CreateTicket.css';

function CreateTicket() {
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('baixo')
    const [prazo, setPrazo] = useState('')
    const [usuarios, setUsuarios] = useState([])
    const [busca, setBusca] = useState('')
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
    const [mostrarLista, setMostrarLista] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsuarios(data))
    }, [])

    const usuariosFiltrados = usuarios.filter(u =>
        u.nome.toLowerCase().includes(busca.toLowerCase())
    )

    function selecionarUsuario(user) {
        setUsuarioSelecionado(user)
        setBusca(user.nome)
        setMostrarLista(false)
    }

    async function salvar() {
        if (!usuarioSelecionado) return alert('Selecione um usuario')
        await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                descricao,
                categoria,
                prazo,
                status: 'aberto',
                usuarioId: usuarioSelecionado.id,
                usuarioNome: usuarioSelecionado.nome,
                data: new Date().toISOString().split('T')[0]
            })
        })
        alert('Chamado criado')
    }

    return (
        <div className="ticket-container">
            <h1>Novo Chamado</h1>

            <div className="campo">
                <label>Cliente</label>
                <div className="autocomplete-wrapper">
                    <input
                        placeholder="Digite o nome do cliente"
                        value={busca}
                        onChange={(e) => { setBusca(e.target.value); setMostrarLista(true); setUsuarioSelecionado(null) }}
                        onFocus={() => setMostrarLista(true)}
                        autoComplete="off"
                    />
                    {mostrarLista && busca && usuariosFiltrados.length > 0 && (
                        <ul className="autocomplete-lista">
                            {usuariosFiltrados.map(u => (
                                <li key={u.id} onMouseDown={() => selecionarUsuario(u)}>
                                    <span className="ac-nome">{u.nome}</span>
                                    <span className="ac-id">#{u.id}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="campo">
                <label>Descricao do problema</label>
                <textarea placeholder="Descreva o problema relatado pelo cliente" onChange={(e) => setDescricao(e.target.value)} />
            </div>

            <div className="campo">
                <label>Categoria / Prioridade</label>
                <select onChange={(e) => setCategoria(e.target.value)}>
                    <option>baixo</option>
                    <option>medio</option>
                    <option>urgente</option>
                </select>
            </div>

            <div className="campo">
                <label>Prazo para resolucao</label>
                <input type="date" onChange={(e) => setPrazo(e.target.value)} />
            </div>

            <button onClick={salvar}>Criar Chamado</button>
        </div>
    )
}

export default CreateTicket