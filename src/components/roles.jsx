import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RolesList = () => {
  const [roles, setroles] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/roles')
      .then(response => {
        setroles(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addRoles = () => {
    axios.post('http://localhost:8080/roles', {
      nombre: nombre,
      descripcion: descripcion
    })
      .then(response => {
        setroles([...roles, response.data]);
        setNombre('');
        setDescripcion('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editRoles = () => {
    
    axios.put(`http://localhost:8080/roles/${id}`, {
      nombre: nombre,
      descripcion: descripcion
      
      
    })
      .then(response => {
       const newroles = [...roles];
        const index = newroles.findIndex(roles => roles.id === id);
        newroles[index] = response.data;
        setroles(newroles);
        setNombre('');
        setDescripcion('');
        setId('');
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteRoles = (id) => {
    axios.delete(`http://localhost:8080/roles/${id}`)
      .then(response => {
        setroles(roles.filter(roles => roles.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>

<form onSubmit={id ? editRoles : addRoles}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </label>
        <br />
        <label>
          Descripcion:
          <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        
        </label>
        <br />
        <br />
        <button className="btn btn-success" type="submit">{id ? 'Edit' : 'Add'}</button>
      </form>

      <br />

      <h2>Listado de roles</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(roles => (
            <tr key={roles.id}>
              <td>{roles.nombre}</td>
              <td>{roles.descripcion}</td>
              <td>
              <button className="btn btn-primary" onClick={() => {
                  setNombre(roles.nombre);
                  setDescripcion(roles.descripcion);
                  setId(roles.id);
                }}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteRoles(roles.id)}>Delete</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      
      
    </div>
  );
};

export default RolesList;