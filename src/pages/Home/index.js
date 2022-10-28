import { useState } from 'react';
import './home.css'
import {Link} from 'react-router-dom'
import {auth} from '../../FirebaseConnect'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Home(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault();

        if(email !== '' && senha !== ''){
          await signInWithEmailAndPassword(auth, email, senha)
          .then(()=>{
                navigate('/admin', {replace: true})
          })
          .catch((error) => {
            console.log(error);
            alert('Usuario não existe')
            setEmail('');
            setSenha('');
          })
          
        } 
        else{
            alert('Preencha com seus dados')          
        }
        
    }

    return(
        <div className='container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agenda de forma fácil</span>

            <form className='form' onSubmit={handleLogin}>
                <input
                    type='text'
                    placeholder='Digite seu E-mail'
                    value={email}
                    onChange={(event)=> setEmail(event.target.value) }
                />
                
                <input
                    type='Password'
                    placeholder='********'
                    value={senha}
                    onChange={(event)=> setSenha(event.target.value) }
                />

                <button type='submit'>Acessar</button>
            </form>

            <Link className='button-link' to='/register'>Não possuiu uma conta? Cadastre-se</Link>
        </div>
    )
}

export default Home;
