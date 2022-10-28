import './admin.css'
import {useState, useEffect} from 'react'
import {auth, db} from '../../FirebaseConnect'
import {signOut} from 'firebase/auth'
import {
    addDoc,
    collection
} from 'firebase/firestore' 
import { async } from '@firebase/util'

export default function Admin(){

    const [tarefa , setTarefa] = useState ('');
    const [userdet, setUserdet] = useState ({});

    useEffect(()=>{
        async function loadtarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUserdet(JSON.parse(userDetail))
        }

        loadtarefas();
    },[] )

    async function handleRegister(e){
        e.preventDefault();

        if( tarefa === ''){
            alert('Digite sua Tarefa')
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefa,
            created: new Date(),
            userUid: userdet?.uid,
        })
        .then(()=>{
            console.log('Tarefa Registrada');
            alert('Tarefa criada com sucesso')
            setTarefa('');
        })
        .catch((error) =>{
            console.log(error)
        })
        
    }

    async function handleSair(){
        await signOut(auth);
    }

    return(
        <div className='admin-container'>
            <h1> <strong>Minhas Tarefas</strong> </h1>

            <form className='form' onSubmit={handleRegister}>
                <textarea 
                    placeholder='Digite a sua tarefa'
                    value={tarefa}
                    onChange={(event) => {
                        setTarefa(event.target.value)
                    }
                    }
                />

                <button className='btn-tarefa' type='submit'>Registrar Tarefa</button>
            </form>

            <article className='list'>

                <p>Estudar JavaScript</p>

                <div>
                    <button>Editar</button>
                    <button className='btn-delete'>Concluido</button>
                </div>
            </article>


            <button className='btn-sair' onClick={handleSair}>Sair da sua conta</button>

        </div>
    )
}