import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './components/Home/header'
import Footer from './components/Home/footer'
import User from './components/User/editprofile'
import ProductList from './components/ProductList'

function App() {

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   firebaseAuth.onAuthStateChanged((user) => {
  //     console.log("user", user);
  //     setUser(user);
  //   });
  // }, []);


  // {user ? <div id='user'>{LogoutBtn()}</div> : <div id='user'>{LoginBtn()}</div>}
  return (
    <BrowserRouter>
      <div className="container">

        <div className='App'>
          <SignIn />
          <SignUp />
        </div>
        <div>
          <Header />
        </div>
        {/* <div>
          <User />
        </div> */}
        <Switch>
          <Route exact path='/' component={ProductList} />
          <Route path='/user-detail' component={User} />
        </Switch>
        <div>
          <Footer/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
