import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState('');
  const [redsocial, setRedsocial] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/usuarios')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  

  const editUsers = () => {
    
    axios.put(`http://localhost:8080/usuarios/${id}`, {
      nombre: nombre,
      username: username
      
      
    })
      .then(response => {
       const newroles = [...User];
        const index = newroles.findIndex(user => user.id === id);
        newroles[index] = response.data;
       
        setNombre('');
        setUsername('');
        setPassword('');
       
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { id, username, nombre, password, fecha, imagen, redsocial };
    axios.post('http://localhost:8080/usuarios', user)
      .then(response => {
        setUsers([...users, response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/usuarios/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Nombre</th>
            <th>Password</th>
            <th>Fecha</th>
            <th>Imagen</th>
            <th>Red Social</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.nombre}</td>
              <td>{user.password}</td>
              <td>{user.fecha}</td>
              <td>{user.imagen} </td>
              <td>{user.redsocial}</td>
              <td>
              <button className="btn btn-primary" onClick={() => {
                  setNombre(user.nombre);
                  setUsername(user.username);
                  setPassword(user.password);
                }}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Agregar Usuario</h2>
      <form onSubmit={id ? handleSubmit : editUsers }>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
        </label><br />
        <label><br />
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Fecha:
          <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        </label><br />
        <label>
          Imagen:
          <input type="text" onChange={e => setImagen(e.target.value)} />
        </label>
        <label>
          Red Social:
          <input type="text" value={redsocial} onChange={e => setRedsocial(e.target.value)} />
        </label><br />
        <button className="btn btn-success" type="submit">{id ? 'Edit' : 'Add'}</button>
      </form>
    </div>
  );
}


export default User;