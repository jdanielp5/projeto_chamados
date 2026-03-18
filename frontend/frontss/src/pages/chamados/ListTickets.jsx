import { useEffect, useState } from 'react'
function ListTickets() {
    const [tickets, setTickets] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/tickets').then(res => res.json()).then(data => setTickets(data))
    }, [])
    return (
        <div>
            <h1>Chamados</h1>
            {tickets.map(t => (
                <div key={t.id}>
                    <p>{t.descricao}</p>
                    <p>{t.categoria}</p>
                </div>
            ))
            }
        </div >)
}
export default ListTickets