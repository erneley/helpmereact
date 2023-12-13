import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


import Login from "./components/Login"
import CasosList from "./components/casos"
import DelitosList from "./components/delitos"
import RolesList from "./components/roles"

import User from "./components/user"



import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login></Login>}></Route>
      
       <Route path='/casos' element={<CasosList></CasosList>}></Route> 
       <Route path='/delitos' element={<DelitosList></DelitosList>}></Route>  
       <Route path='/roles' element={<RolesList></RolesList>}></Route>               
      
       <Route path='/user' element={<User></User>}></Route>               
                
     </Routes>

     </BrowserRouter>

  );
}

export default App;
