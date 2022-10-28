import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../FirebaseConnect'
import {Navigate} from 'react-router-dom'

export default function Private({children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect( ()=>{

        async function checkLogin(){
            // eslint-disable-next-line no-unused-vars
            const unsub = onAuthStateChanged(auth, (user) => {
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }
                    localStorage.setItem("@detailUser", JSON.stringify(userData));

                    setLoading(false)
                    setSigned(true)
                    
                }
                else{
                    setLoading(false);
                    setSigned(false);
                    
                }
            })

            
        }

        checkLogin();

    }, [])


    
    if(loading){
        return(
            <div></div>
        )

    }

    if(!signed){
        return <Navigate to='/' />
       
    }
    return children ;
   
   
}