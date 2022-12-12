import React, { useRef, useContext } from 'react'
import AlertContext from './Alert';
import '../CSS/Home.css'
import { userContext } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Payment() {

    const HOST = 'http://127.0.0.1:80';
    const show = useContext(AlertContext);
    const {user ,setUser} = useContext(userContext);

    const month = useRef();
    const batch = useRef();
    const cardNumber = useRef();
    const cardHolder = useRef();
    const expires = useRef();
    const cvv = useRef();

    const setMonth = (e) => {
        month.current.innerText = e.target.innerText;
        month.current.value = e.target.innerText;
    }
    const setBatch = (e) => {
        batch.current.innerText = e.target.innerText;
        batch.current.value = e.target.innerText;
    }

    const getValue = ( ref )=>{
        return ref.current.value;
    }

    const pay = async () => {

        if( !user ){
            show('warning', 'First Login Then Pay.');
            return;
        }

        if( !getValue(month) || !getValue(batch) || !getValue(cardNumber) || !getValue(cardHolder) || !getValue(expires) || !getValue(cvv) ){
            show('error', 'Please Fill The Correct Details.');
            return;            
        }

        if( user.payment && getValue(month) in user.payment ){
            show('error', 'Already Paid For This Month.');
            return;
        }
        
        const request = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
                month: getValue(month),
                batch: getValue(batch),
                cardNumber: getValue(cardNumber),
                cardHolder: getValue(cardHolder),
                expires: getValue(expires),
                cvv: getValue(cvv)
            })
        }

        let response = await fetch(`${HOST}/payment`, request);
        if (response.status !== 200) {
            response = await response.json();
            show('info', response.msg);
        } else {
            show('success', 'Payment SuccessFul.');
            let obj = user.payment;
            if( obj == undefined ) obj = {};
            obj[getValue(month)] = {
                batch : getValue(batch)
            }

            user.payment = obj;
            setUser( user );
        }
    }

    return (
        <>
            <div className="credit-info">
                <div className="credit-info-content">
                    <table className="half-input-table">
                        <tbody>
                            <tr>
                                <td>

                                    <div className="dropdown show" id="card-dropdown" >
                                        <div className="dropdown-btn" role="button" id="current-card" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ref={month} >
                                            Month
                                        </div>
                                        <div className="dropdown-menu" onClick={setMonth} >
                                            <ul>
                                                <li key="Jan" >Jan</li>
                                                <li key="Feb" >Feb</li>
                                                <li key="Mar" >Mar</li>
                                                <li key="Apr" >Apr</li>
                                                <li key="May" >May</li>
                                                <li key="Jun" >Jun</li>
                                                <li key="Jul" >Jul</li>
                                                <li key="Aug" >Aug</li>
                                                <li key="Sep" >Sep</li>
                                                <li key="Oct" >Oct</li>
                                                <li key="Nov" >Nov</li>
                                                <li key="Dec" >Dec</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="dropdown show" id="card-dropdown" >
                                        <div className="dropdown-btn" ref={batch} role="button" id="current-card" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            batch
                                        </div>
                                        <div className="dropdown-menu" onClick={setBatch}>
                                            <ul>
                                                <li key="6-7AM" >6-7AM</li>
                                                <li key="7-8AM" >7-8AM</li>
                                                <li key="8-9AM" >8-9AM</li>
                                                <li key="5-6PM" >5-6PM</li>
                                            </ul>
                                        </div>
                                    </div>

                                </td>

                            </tr>
                        </tbody>
                    </table>

                    <div className="line" />
                    <br />
                    Card Number
                    <input className="input-field" ref={cardNumber} />
                    Card Holder
                    <input className="input-field" ref={cardHolder} />
                    <table className="half-input-table">
                        <tbody>
                            <tr>
                                <td>
                                    {" "}
                                    Expires
                                    <input className="input-field" ref={expires} />
                                </td>
                                <td>
                                    CVV
                                    <input className="input-field" ref={cvv} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="pay-btn" onClick={pay} >Pay 500₹</button>
                </div>
            </div>
        </>
    )
}
