import React ,{useContext} from 'react'
import { userContext } from '../App';
import '../CSS/User.css';

export default function User() {
    const {user} = useContext(userContext);
    const months = ["Jan" ,"Feb" ,"Mar" ,"Apr" ,"May" ,"Jun" ,"Jul" ,"Aug" ,"Sep" ,"Oct" ,"Nov" ,"Dec"];

    return (
        <>  
            <div id='userBox' > 
                <h2>Hey! {user.name}</h2>
                <div className="line" /><br />
                <label>Email ID : {user.email}</label><br />
                <label>Age : {user.age}</label><br />
                <label>Remaining Payments :&nbsp;&nbsp;
                    {
                        months.map( (val)=>{
                            if( !user.payment || !(val in user.payment) ){
                                return <span key={val} className="badge rounded-pill bg-warning">{val}</span> 
                            }
                        } )
                    }
                </label>
            </div>
        </>
    )
}
