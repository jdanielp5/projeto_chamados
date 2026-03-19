import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListTickets.css';

function ListTickets() {
    const [tickets, setTickets] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/tickets').then(res => res.json()).then(data => setTickets(data))
    }, [])

    function getStatus(ticket) {
        if (!ticket.prazo) return { label: 'Recente', cor: 'verde' }
        const hoje = new Date()
        const prazo = new Date(ticket.prazo)
        const diff = (prazo - hoje) / (1000 * 60 * 60 * 24)
        if (diff < 0) return { label: 'Em atraso', cor: 'vermelho' }
        if (diff <= 2) return { label: 'Pendente', cor: 'amarelo' }
        return { label: 'Recente', cor: 'verde' }
    }

    return (
        <div className="tickets-grid">
            <h1>Chamados</h1>
            {tickets.map(t => {
                const status = getStatus(t)
                return (
                    <div
                        key={t.id}
                        className={`ticket-card status-${status.cor}`}
                        onClick={() => navigate('/edit-ticket/' + t.id)}
                    >
                        <div className="ticket-card-header">
                            <span className="ticket-id">#{t.id}</span>
                            <span className={`badge ${status.cor}`}>{status.label}</span>
                        </div>
                        <p className="ticket-usuario"><strong>Usuario:</strong> {t.usuarioNome || '-'}</p>
                        <p><strong>Descricao:</strong> {t.descricao}</p>
                        <p><strong>Categoria:</strong> {t.categoria}</p>
                        <p><strong>Prazo:</strong> {t.prazo || 'Nao informado'}</p>
                        <span className="ticket-editar">Clique para editar →</span>
                    </div>
                )
            })}
        </div>
    )
}

export default ListTickets