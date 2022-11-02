import { useState, useEffect } from 'react'
import './admin.css'

import { auth, db } from '../../FirebaseConnect'
import { signOut } from 'firebase/auth'

import { 
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import { async } from '@firebase/util'

export default function Admin(){
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})

  const [tarefas, setTarefas] = useState([]);

  const [edit, setEditTare] = useState([]);

  useEffect(() => {
    async function loadTarefas(){
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if(userDetail){
        const data = JSON.parse(userDetail);
        
        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, where("userUid", "==", data?.uid))

        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc)=> {
            lista.push({
              id: doc.id,
             // dateObj.getMilliseconds(created): doc.data().created,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })
          
          
          setTarefas(lista);


        })

      }

    }

    loadTarefas();
  }, [])

 // console.log(tarefas)

  async function handleRegister(e){
    e.preventDefault();

    if(tarefaInput === ''){
      alert("Digite sua tarefa...")
      return;
    }

    if(edit?.id){
      handleUp();
      return;
    }
    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      console.log("TAREFA REGISTRADA")
      setTarefaInput('')
    })
    .catch((error) => {
      console.log("ERRO AO REGISTRAR " + error)
    })


  }

  async function deleteTarefa(id){
    const docRef = doc(db, 'tarefas', id)
    await deleteDoc(docRef)
  }

  function editarTarefa(item){
    setTarefaInput(item.tarefa);
    setEditTare(item);
  }

  async function handleUp(){
    const docRef = doc(db, 'tarefas', edit?.id)

    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
    .then(()=>{
      console.log("tarefa atualiza")
      setTarefaInput('')
      setEditTare({});
    })
    .catch((error) =>{
      console.log(error)
      
    })
  };

  async function handleLogout(){
    await signOut(auth);
  }

  return(
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value) }
        />

        {
          Object.keys(edit).length > 0 ? (<button className="btn-register" type="submit">Atualizar tarefa</button>):
          (
            <button className="btn-register" type="submit">Registrar tarefa</button>
          )
        }
        
      </form>

      
      {tarefas.map((item) => (
        
        <article key={item.id} className="list">
        <p>{item.tarefa}</p>
        <h3>{item.userUid}</h3>

        <div>
          <button onClick={ () => editarTarefa(item)}>Editar</button>
          <button className="btn-delete" onClick={ () => deleteTarefa(item.id)}>Concluir</button>
        </div>
      </article>
      ))}
      
      <button className="btn-logout" onClick={handleLogout}>Sair</button>

    </div>
  )
}