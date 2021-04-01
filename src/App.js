import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import AddBook from './Components/AddBook/AddBook';
import ManageBook from './Components/ManageBook/ManageBook';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import Order from './Components/Order/Order';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header></Header>
        <Switch>

          <Route path="/addBook">
            <AddBook></AddBook>
          </Route>

          <Route path="/manageBook">
            <ManageBook></ManageBook>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/order/:id">
            <Order></Order>
          </PrivateRoute>

          <Route exact path="/">
            <Home/>
          </Route>

        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
