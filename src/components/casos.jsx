import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CasosList = () => {
  const [casos, setcasos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/casos')
      .then(response => {
        setcasos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addCasos = () => {
    axios.post('http://localhost:8080/casos', {
      nombre: nombre,
      descripcion: descripcion
    })
      .then(response => {
        setcasos([...casos, response.data]);
        setNombre('');
        setDescripcion('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editCasos = () => {
    
    axios.put(`http://localhost:8080/casos/${id}`, {
      nombre: nombre,
      descripcion: descripcion
      
      
    })
      .then(response => {
       const newcasos = [...casos];
        const index = newcasos.findIndex(casos => casos.id === id);
        newcasos[index] = response.data;
        setcasos(newcasos);
        setNombre('');
        setDescripcion('');
        setId('');
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteCasos = (id) => {
    axios.delete(`http://localhost:8080/casos/${id}`)
      .then(response => {
        setcasos(casos.filter(casos => casos.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>


<form onSubmit={id ? editCasos : addCasos}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
          
        </label>
        <br />
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <br />
        </label>
        <br />
        <button className="btn btn-success" type="submit">{id ? 'Editar' : 'Agregar'}</button>
      </form>


      <br /><br />
      <h2>Listado de casos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {casos.map(casos => (
            <tr key={casos.id}>
              <td>{casos.nombre}</td>
              <td>{casos.descripcion}</td>
              <td>
              <button className="btn btn-primary" onClick={() => {
                  setNombre(casos.nombre);
                  setDescripcion(casos.descripcion);
                  setId(casos.id);
                }}>Edit</button>
                <button className="btn btn-danger"onClick={() => deleteCasos(casos.id)}>Delete</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      
      
    </div>
  );
};

export default CasosList;