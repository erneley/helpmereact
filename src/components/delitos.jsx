import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DelitosList = () => {
  const [delitos, setdelitos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/delitos')
      .then(response => {
        setdelitos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addDelitos = () => {
    axios.post('http://localhost:8080/delitos', {
      nombre: nombre,
      descripcion: descripcion
    })
      .then(response => {
        setdelitos([...delitos, response.data]);
        setNombre('');
        setDescripcion('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editDelitos = () => {
    
    axios.put(`http://localhost:8080/delitos/${id}`, {
      nombre: nombre,
      descripcion: descripcion
      
      
    })
      .then(response => {
       const newdelitos = [...delitos];
        const index = newdelitos.findIndex(delitos => delitos.id === id);
        newdelitos[index] = response.data;
        setdelitos(newdelitos);
        setNombre('');
        setDescripcion('');
        setId('');
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteDelitos = (id) => {
    axios.delete(`http://localhost:8080/delitos/${id}`)
      .then(response => {
        setdelitos(delitos.filter(delitos => delitos.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Crear y editar registros de delitos</h3>
     <form onSubmit={id ? editDelitos : addDelitos}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </label> <br />
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        
        </label><br /><br />
        <button className="btn btn-success" type="submit">{id ? 'Editar' : 'Agregar'}</button>
      </form>
    
<br /><br />
      <h2>Listado </h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {delitos.map(delitos => (
            <tr key={delitos.id}>
              <td>{delitos.nombre}</td>
              <td>{delitos.descripcion}</td>
              <td>
              <button className="btn btn-primary" onClick={() => {
                  setNombre(delitos.nombre);
                  setDescripcion(delitos.descripcion);
                  setId(delitos.id);
                }}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteDelitos(delitos.id)}>Delete</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      
     </div>
  );
};

export default DelitosList;