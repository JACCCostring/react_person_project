import Reac, { useState } from 'react'
import api from '../api'

import './Modal.css'

const Modal = (props) => {

    const [formPersonData, setFormPersonData] = useState({
        firstName: props.p_modf.firstName,
        lastName: props.p_modf.lastName,
        age: props.p_modf.age,
        phone: props.p_modf.phone
    });

    const handleAnyChangesInput = (e)=> {
        setFormPersonData({
            ...formPersonData, [e.target.name]: e.target.value
          });

          console.log(formPersonData)
    };

    const handleModifyPerson = async (e)=>{
        e.preventDefault()

        // console.log(formPersonData)

        await api.put('/all_person/'.concat(props.p_modf.id, '/'), formPersonData )

        props.fetch_again()
        props.closePersonModel()
    };

    return(
        <div className='modal-container' onClick={(e)=> { if (e.target.className === 'modal-container') props.closePersonModel() }}>
            <div className='modal'>
                <form onSubmit={handleModifyPerson}>
                <div className='formGroup'>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' name='firstName' defaultValue={props.p_modf.firstName} onChange={handleAnyChangesInput}/>
                </div>

                <div className='formGroup'>
                    <label htmlFor='lasttName'>Last Name</label>
                    <input type='text' name='lastName' defaultValue={props.p_modf.lastName} onChange={handleAnyChangesInput}/>
                </div>

                <div className='formGroup'>
                    <label htmlFor='age'>Age</label>
                    <input type='number' name='age' defaultValue={props.p_modf.age} onChange={handleAnyChangesInput}/>
                </div>

                <div className='formGroup'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='text' name='phone' defaultValue={props.p_modf.phone} onChange={handleAnyChangesInput}/>
                </div>

                <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Modal