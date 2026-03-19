import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './EditTicket.css'

function EditTicket() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ticket, setTicket] = useState(null)
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [prazo, setPrazo] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/tickets')
            .then(res => res.json())
            .then(data => {
                const found = data.find(t => t.id === id)
                if (found) {
                    setTicket(found)
                    setDescricao(found.descricao)
                    setCategoria(found.categoria)
                    setPrazo(found.prazo || '')
                    setStatus(found.status || 'aberto')
                }
            })
    }, [id])

    async function salvar() {
        await fetch('http://localhost:3000/tickets/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descricao, categoria, prazo, status })
        })
        alert('Chamado atualizado')
        navigate('/tickets')
    }

    if (!ticket) return <p style={{ padding: 30 }}>Carregando...</p>

    return (
        <div className="edit-ticket-container">
            <h1>Editar Chamado <span>#{ticket.id}</span></h1>

            <div className="campo">
                <label>Cliente</label>
                <input value={ticket.usuarioNome || '-'} disabled />
            </div>

            <div className="campo">
                <label>Data de abertura do chamado</label>
                <input value={ticket.data || '-'} disabled />
            </div>

            <div className="campo">
                <label>Descricao do problema</label>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>

            <div className="campo">
                <label>Categoria / Prioridade</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option>baixo</option>
                    <option>medio</option>
                    <option>urgente</option>
                </select>
            </div>

            <div className="campo">
                <label>Prazo para resolucao</label>
                <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
            </div>

            <div className="campo">
                <label>Status do chamado</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="aberto">Aberto</option>
                    <option value="em andamento">Em andamento</option>
                    <option value="resolvido">Resolvido</option>
                </select>
            </div>

            <div className="edit-ticket-btns">
                <button className="btn-salvar" onClick={salvar}>Salvar Alteracoes</button>
                <button className="btn-cancelar" onClick={() => navigate('/tickets')}>Cancelar</button>
            </div>
        </div>
    )
}

export default EditTicket