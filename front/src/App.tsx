import './App.css';
import { Route, Routes } from 'react-router-dom';
import OAuth from 'views/Authentication/OAuth';
import SignIn from 'views/Authentication/SignIn';
import SignUp from 'views/Authentication/SignUp';
import HomePage from 'views/User/Homepage';

function App() {

  
  return (
    <Routes>
      <Route path='/auth'>
        <Route path='user' element={<HomePage/>}/>
        <Route path='sign-up' element={<SignUp/>} />
        <Route path='sign-in' element={<SignIn/>} />
        <Route path='oauth-response/:token/:expirationTime' element={<OAuth />} />
      </Route>
    </Routes>
  );
}

export default App;
