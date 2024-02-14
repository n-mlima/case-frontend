import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiShow,BiHide } from 'react-icons/bi';
import InputMask from "react-input-mask";
import { v4 as uuidv4 } from 'uuid';


 const API="http://localhost:3001"
 const Register=({setActiveRoute})=>{
    
  
    const [person,setPerson]=useState('')
    const [userName,setUserName]=useState("")
    const [dataBirtday, setDataBirtday]=useState('')
    const [email, setEmail]=useState("")
    const [password,setPassword]=useState('')
    const [error, setError]=useState(true)
    const [notification,setNotification]=useState(false)
    const [showHidePassword,setShowHidePassword]=useState(false)
    const [users, setUsers]=useState([])
    const [loading, setLoading]=useState(false)
    const history=useNavigate();
    const inputMaskRef = useRef(null);
    
    useEffect(()=>{
        setActiveRoute("")

    },[setActiveRoute]);

    useEffect(() => {
        
        const timer = setTimeout(() => {
            setNotification(false); 
        }, 5000);

        
        return () => clearTimeout(timer);
    }, [notification]);

    
    
    //pendente:validação de nome de usuário, e-mail
    const verifyCaracter=(e)=>{
        e.preventDefault()
        if (/[!@#$%^&*(),.?":{}|<>]/.test(userName,person)) {
            setUserName("")
            setPerson("")

          } 
        }
    
    const handleUser= async (e)=>{
        e.preventDefault() 
        const id=uuidv4()
        const listUser={
            id,
            person,
            userName,
            dataBirtday,
            email,
            password
        }

        await fetch(API+"/users",{
            method:"POST",
                body: JSON.stringify(listUser),
                headers:{
                  "Content-Type":"application/json",
                },
        });


        setUsers((prev)=>[...prev, listUser])
        setNotification(true)
        clearForm()
        

    }
    

    const showPassword= ()=>{
        setShowHidePassword(!showHidePassword)
       }

    const clearForm=()=>{
        setPerson("")
        setUserName("")
        setDataBirtday("")
        setEmail("")
        setPassword("")
    }

    
    
    return (
    
        <>  {notification &&(<div className='success-message'>Cadastro Realizado com sucesso</div>)}
            <form className="form" onSubmit={handleUser} >
                <h1>Criando uma Conta</h1>
                <div className='div-group'>
                    <label className="label" htmlFor="person">Nome:</label>
                    <input className='input'
                    id="person"
                    placeholder="Nome completo"
                    onChange={(e)=>setPerson(e.target.value)}
                    onBlur={verifyCaracter}
                    value={person}
                    required
                    />

                </div>
                
                <div className='div-group'>
                    <label className="label" htmlFor="userName">Nome de Usuário:</label>
                    <input className="input"
                    id="userName"
                    placeholder="Como gostaria de ser chamado"
                    onChange={(e)=>{setUserName(e.target.value)}}
                    onBlur={verifyCaracter}
                    value={userName}
                    required
                    
                    />

                </div>

                <div className='div-group'>
                    <label className="label" htmlFor="data-birtday">Data de Nascimento:</label>
                    <InputMask className='input'
                    mask={"99/99/9999"}
                    id="data-birtday"
                    value={dataBirtday}
                    onChange={(e)=>setDataBirtday(e.target.value)}
                    placeholder='Formato DD/MM/YYYY'
                    required
                    ref={inputMaskRef}
                    
                    
                    />

                </div>

                <div className='div-group'>
                    <label className='label' htmlFor="email">E-mail:</label>
                    <input className='input input-control'
                    id="email"
                    placeholder="ex.: exemplo@gmail.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                    
                    />
                </div>

                <div className='div-group'>
                    <label className='label' htmlFor="password">Senha:</label>
                    <input className='input form-control'
                    id="password"
                    placeholder="Informe uma senha"
                    onChange={(e)=>setPassword(e.target.value)}
                    type={showHidePassword?'text':'password'}
                    value={password}
                    required
                    
                    />
                    <span className="hide" onClick={showPassword}>{showHidePassword?<BiShow className="icon-hide"/>:<BiHide  className="icon-hide"/>}</span>

                </div>
                
                <div className='btt-group'>
                    <input className="inputSubmit" type="submit" value={"Cadastrar"}></input>
                    <input className="inputSubmit" type="button" onClick={()=>history('/')} value={"Sair"}></input>

                </div>
                
                
            </form>
        </>
    
);

    }
    
    
    
      

     
    


export default Register;

