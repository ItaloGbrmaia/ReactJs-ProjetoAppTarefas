import { useState } from 'react';

import {Link} from 'react-router-dom'
import {auth} from '../../FirebaseConnect'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

function Register(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();
    
    async function handleRegister(event){
        event.preventDefault();

        if(email !== '' && senha !== ''){
           await createUserWithEmailAndPassword(auth, email, senha)
           .then(()=>{
                navigate('/admin', {replace: true} )
           })
           .catch((error) => {
                console.log(error)
           })
        } 
        else{
            alert('Preencha com seus dados')
        }
        
    }

    return(
        <div className='container'>
            <h1>Cadastre-se</h1>
            

            <form className='form' onSubmit={handleRegister}>
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

                <button type='submit'>Registre-se</button>
            </form>

            <Link className='button-link' to='/'>Ja possui conta faça login </Link>
        </div>
    )
}

export default Register;
