import React ,{useRef ,useContext} from 'react'
import { useNavigate ,Link } from 'react-router-dom';
import AlertContext from './Alert';
import { userContext } from '../App';

export default function Login() {

    const HOST = 'http://127.0.0.1:80';
    const navigate = useNavigate();
    const {setUser} = useContext(userContext);

    const email = useRef();
    const password = useRef();

    const show = useContext(AlertContext);
    const getValue = ( ref )=>{
        return ref.current.value;
    }

    const login = async ()=>{

        const request = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({
                email : getValue(email),
                password : getValue(password),
            })
        }

        try{
            let response = await fetch(`${HOST}/user/login`, request);

            if (response.status !== 200) {
                response = await response.json();
                show('info', response.msg );
            } else{
                response = await response.json();
                setUser(response);
                show('success', 'Successfully Logged in.');
                navigate('/user');
            }   
        } catch{
            show( 'error' ,'Try Again' );
        }

    }

    return (
        <>
            <h2>Login</h2>
            <div className="line" /><br />
            Email ID :
            <input type="text" className='input-field' placeholder='@gmail.com' ref={email} />
            Password :
            <input type="text" className='input-field' ref={password} />
            <span id='account' >Don't have an Account? <Link id='register' onClick={navigate('/register')} >Register</Link></span>
            <button className='login-btn' onClick={login} >Login</button>
        </>
    )
}
