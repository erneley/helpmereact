import React, { useState } from 'react';
import axios from 'axios';





function Login() {

    const [descripcion, setDescripcion] = useState('');
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (event) => {
   // event.preventDefault();

    const data = {
      Usuario: descripcion,
      contraseña: nombre
      
    };

    const response = await axios.post(
      'http://localhost:8080/roles',
      data
    );

    console.log(response.data);
  };

  return (

    <div>
      <div id="container">
      <div class="wrapper">
        
         <form class="login" onSubmit={handleSubmit}>
     
   
    

    <label>
        Usuario:
        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" placeholder="password" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
       
      </label>
      <br />
      <button type="submit">Submit</button>


      <p class="message">Not registered? <a href="#">Create an account</a></p>
     
    </form>
  </div>
  </div>
  </div>      
              
    
  );
}

export default Login
