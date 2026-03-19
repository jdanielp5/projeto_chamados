import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css';

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    function login() {
        if (email === 'projeto@gmail.com' && senha === '123') {
            navigate('/home')
        } else {
            alert('Login invalido')
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-icon">🎧</div>
                <h2>Sistema de Chamados</h2>
                <p>Faca login para continuar</p>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Senha" type="password" onChange={(e) => setSenha(e.target.value)} />
                <button onClick={login}>Entrar</button>
            </div>
        </div>
    )
}

export default Login
