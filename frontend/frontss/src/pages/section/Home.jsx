import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css';

function Home() {
    const [tickets, setTickets] = useState([])
    const [cotacoes, setCotacoes] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/tickets')
            .then(res => res.json())
            .then(data => setTickets(data))
    }, [])

    useEffect(() => {
        fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
            .then(res => res.json())
            .then(data => setCotacoes(data))
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

            {/* Cotacoes */}
            {cotacoes && (
                <div className="cotacoes-bar">
                    <span className="cotacao-item">
                        💵 USD <strong>R$ {parseFloat(cotacoes.USDBRL.bid).toFixed(2)}</strong>
                        <span className={parseFloat(cotacoes.USDBRL.pctChange) >= 0 ? 'positivo' : 'negativo'}>
                            {parseFloat(cotacoes.USDBRL.pctChange) >= 0 ? ' ▲' : ' ▼'} {cotacoes.USDBRL.pctChange}%
                        </span>
                    </span>
                    <span className="cotacao-item">
                        💶 EUR <strong>R$ {parseFloat(cotacoes.EURBRL.bid).toFixed(2)}</strong>
                        <span className={parseFloat(cotacoes.EURBRL.pctChange) >= 0 ? 'positivo' : 'negativo'}>
                            {parseFloat(cotacoes.EURBRL.pctChange) >= 0 ? ' ▲' : ' ▼'} {cotacoes.EURBRL.pctChange}%
                        </span>
                    </span>
                    <span className="cotacao-item">
                        ₿ BTC <strong>R$ {parseFloat(cotacoes.BTCBRL.bid).toLocaleString('pt-BR')}</strong>
                        <span className={parseFloat(cotacoes.BTCBRL.pctChange) >= 0 ? 'positivo' : 'negativo'}>
                            {parseFloat(cotacoes.BTCBRL.pctChange) >= 0 ? ' ▲' : ' ▼'} {cotacoes.BTCBRL.pctChange}%
                        </span>
                    </span>
                </div>
            )}

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