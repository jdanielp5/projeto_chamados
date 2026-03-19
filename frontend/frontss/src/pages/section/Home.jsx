import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

function Home() {
    const [tickets, setTickets] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/tickets')
            .then(res => res.json())
            .then(data => setTickets(data))
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
        <div className="home-container">
            <div className="home-header">
                <h2>Chamados Abertos</h2>
                <button onClick={() => navigate('/ticket')}>+ Novo Chamado</button>
            </div>

            {tickets.length === 0 ? (
                <p className="home-vazio">Nenhum chamado cadastrado ainda.</p>
            ) : (
                <div className="home-grid">
                    {tickets.map(t => {
                        const status = getStatus(t)
                        return (
                            <div
                                key={t.id}
                                className={`home-card status-${status.cor}`}
                                onClick={() => navigate('/edit-ticket/' + t.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <p className="home-card-desc">{t.descricao}</p>
                                <div className="home-card-footer">
                                    <span className="home-categoria">{t.categoria}</span>
                                    <span className={`home-badge ${status.cor}`}>{status.label}</span>
                                </div>
                                {t.prazo && <p className="home-prazo">Prazo: {t.prazo}</p>}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Home