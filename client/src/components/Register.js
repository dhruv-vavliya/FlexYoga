import React ,{useContext, useRef } from 'react'
import AlertContext from './Alert'
import {useNavigate ,Link} from 'react-router-dom'

export default function Register() {

    const HOST = 'http://127.0.0.1:80';
    const navigate = useNavigate();

    const mailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const numReg = /^[0-9]+$/;

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const age = useRef();

    const show = useContext(AlertContext);
    const getValue = ( ref )=>{
        return ref.current.value;
    }

    const valid = ()=>{
        if( getValue(name).length <= 2 || mailReg.test(getValue(email)) == false || numReg.test(getValue(age)) == false ){
            return false;
        }

        if( getValue(age) < 18 || 65 < getValue(age) ){
            return false;
        }   
        return true;
    }

    const register = async ()=>{

        if( valid() ){
            const request = {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json'
                } ,
                body: JSON.stringify({
                    name : getValue(name) ,
                    email : getValue(email),
                    password : getValue(password),
                    age : getValue(age)
                })
            }

            try{
                let response = await fetch(`${HOST}/user/register`, request);
                if (response.status !== 200) {
                    response = await response.json();
                    show('info', response.msg );
                } else{
                    show('success', 'Successfully Registered.');
                    navigate('/login');
                }   
            } catch{
                show( 'error' ,'Try Again' );
            }

        } else{
            show( 'warning' ,'You Are Not Eligible.' );
        }
    }


    return (
        <>
            <h2>Register</h2>
            <div className="line" />
            Usename
            <input type="text" className='input-field' ref={name} />
            Email ID
            <input type="text" className='input-field' placeholder='@gmail.com' ref={email} />
            Password
            <input type="text" className='input-field' ref={password} />
            Age
            <input type="text" className='input-field' ref={age} />
            <span id='account' >Already have an Account? <Link id='register' onClick={navigate('/login')} >Login</Link></span>
            
            <button className='login-btn' onClick={register} >Register</button>
        </>
    )
}
