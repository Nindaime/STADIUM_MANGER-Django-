import {useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Login from './Pages/Admin/Login';
import Signup from './Pages/Admin/Signup';
import NewEvent from './Pages/Admin/NewEvent';
import UpdateEvent from './Pages/Admin/UpdateEvent';
import EventReport from './Pages/EventReport';
import Home from './Pages/Customer/Home';
import Event from './Pages/Customer/Event';
import AllEvents from './Pages/Customer/AllEvents';

import CLogin from './Pages/Customer/CLogin'
import CSignup from './Pages/Customer/CSignup'
import {useSelector} from 'react-redux'
import Error from './Pages/Error';


import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  
  const adminLogged = useSelector(state => state.admin)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/admin" element={<Login/>} />
          <Route exact path="/admin/signup" element={<Signup/>} />

          <Route exact path="/matches" element={<AllEvents/>} />

          <Route exact path="/admin/create-event" element={adminLogged? <NewEvent/>: <Error />} />
          <Route exact path="/admin/update-event" element={adminLogged? <UpdateEvent/>: <Error />} />
          <Route exact path="/admin/report-event" element={adminLogged? <EventReport/>: <Error />} />

          {/* not found page */}
          <Route exact path="/404" element={<Error/>} />


          {/* customer routes */}
          <Route exact path="/login" element={<CLogin/>} />
          <Route exact path="/signup" element={<CSignup/>} />


          
          <Route path="/event/:id" element={<Event />} />
          {/* <Route exact path="/build" element={<Build/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
