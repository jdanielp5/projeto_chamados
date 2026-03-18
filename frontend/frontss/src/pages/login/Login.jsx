import { useState } from 'react' 
import { useNavigate } from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState('') 
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    function login() {
        if (email === 'projeto@gmail.com' && senha === '123') { navigate('/home') } else { alert('Login inválido') }
    }
    return (<div>
        <h1>Login</h1>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="senha" type="password" onChange={(e) => setSenha(e.target.value)} />
        <button onClick={login}>Entrar</button>
    </div>)
}
export default Login