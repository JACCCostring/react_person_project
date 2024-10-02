import Reac, {useState, useEffect} from 'react'
import api from './api'
import Modal from './Components/Modal.jsx'

const App = () => {
  // use states hooks
  const [person, setPerson] = useState([]);

  const [formPersonData, setFormPersonData] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    phone: ''
  });

  const [addPersonModal, setAddPersonModal] = useState(false)
  
  const [person_to_modify, setPerson_to_modify] = useState({
    firstName: '',
    lastName:'',
    age: '',
    phone: ''
  });

  const [search, setSearch] = useState('')

  // end of states hooks

  const fetchAllPerson = async () => {
    const resp = await api.get('/all_person/')

    setPerson(resp.data)
  };

  useEffect(() => {
    fetchAllPerson();

    console.log(person)
  }, []);

  const handleInputChanges = (event) => {
    setFormPersonData({
      ...formPersonData, [event.target.name]: event.target.value
    });

    // setPerson([{...formPersonData}])
};

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formPersonData)

    await api.post('/all_person/', formPersonData);

    fetchAllPerson();

    setFormPersonData({
      firstName: '',
      lastName: '',
      age: 0,
      phone: ''
    });
  };

  const handleDeletePerson = async (user_uuid) =>{
    await api.delete('/all_person/'.concat(user_uuid, '/'))
    
    fetchAllPerson()
  };

  const handleModifyPerson = (user_uuid) =>{
    for(let idx = 0; idx < person.length; idx++){
      
      if (person[idx].id === user_uuid){
        const person_to_modify = person[idx]

      setPerson_to_modify(person_to_modify)
      }
    }

    setAddPersonModal(true)
  }


  // jsx code 
  return (
    // navigation bar
    <div className='root-container'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Person CRUD App
          </a>
        </div>
      </nav>

    {/* Form for adding person */}
    <div className='content-form'>
      <form onSubmit={handleFormSubmit}>

        <div className='searchKey'>
          <input type='text' placeholder='filter by name' onChange={ (e) =>{setSearch(e.target.value)} } ></input>
        </div>

        <div className=''>
        {/* ui element for first name */}
        <div className='form-group'>
        <label htmlFor='firstName' className=''>
          First Name
        </label>
        <input type='text' placeholder='name' className='' id='firstName' name='firstName' onChange={handleInputChanges} value={formPersonData.firstName}/>
        </div>

        <div className='form-group'>
        {/* ui element for last name */}
        <label htmlFor='lastName' className=''>
          Last Name
        </label>
        <input type='text' placeholder='second name' className='' id='lastName' name='lastName' onChange={handleInputChanges} value={formPersonData.lastName}/>
        </div>

        <div className='form-group'>
        {/* ui element for age */}
        <label htmlFor='age' className=''>
          Age
        </label>
        <input type='number' className='' id='age' name='age' onChange={handleInputChanges} value={formPersonData.age}/>
        </div>

        <div className='form-group'>
        {/* ui element for age */}
        <label htmlFor='phone' className=''>
          Phone Number
        </label>
        <input type='text' placeholder='phone numer' className='' id='phone' name='phone' onChange={handleInputChanges} value={formPersonData.phone}/>
        </div>

        </div>

        <button type='submit' className='btn btn-primary'>
          Add Person
        </button>

      </form>
    </div>
    
  {/* table for displaying data */}
  <div className='content-wrapper'>
    <table className="content-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {person.filter((p) => {
          return search.toLowerCase() === '' ? p : p.firstName.toLowerCase().includes(search);
        }).map((p) => (
        <tr key={p.id}>
          <td>{p.firstName}</td>
          <td>{p.lastName}</td>
          <td>{p.age}</td>
          <td>{p.phone}</td>

          <button onClick={()=> handleModifyPerson(p.id)}>Edit</button>
          <button onClick={()=> handleDeletePerson(p.id)}>Delete</button>
        </tr>
        ))}
      </tbody>
    </table>   
    
    </div>
    
    {/* modal component for modifying data from table and deliver it back to DB*/}
    {addPersonModal ? <Modal p_modf={person_to_modify} fetch_again={fetchAllPerson} closePersonModel={()=> { setAddPersonModal() }}/>: ''} 

  </div>
  )

}

export default App
