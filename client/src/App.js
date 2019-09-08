import React from "react";
import ReactDOM from "react-dom";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from 'react-router-dom';
import "./App.css";
import NotFound from "./pages/404";
import Posts from "./components/posts";

const users = [
  {
    name: `Param`
  },
  {
    name: `Vennila`
  },
  {
    name: `Afrin`
  }
];

const IndexPage = () => {
  return <h3>Home Page</h3>;
};

const AboutPage = () => {
  return <h3>About Page</h3>;
};

const UsersPage = () => {
  return (
    <React.Fragment>
      {users.map((user  , index) => (
        <h5 key={index}>
          <Link to={`/user/${index + 1}`}>{user.name}'s Page</Link>
        </h5>
      ))}
    </React.Fragment>
  );
};

const UserPage = ({ match, location }) => {
  const {
    params: { userId }
  } = match;

  return (
    <React.Fragment>
      <p>
        <strong>User ID: </strong>
        {userId}
      </p>
      <p>
        <strong>User Name: </strong>
        {users[userId - 1].name}
      </p>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <section className="App">
      <Router>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
        <Link to='/posts'>Posts</Link>
        <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/users" component={UsersPage} />
        <Route exact path="/user/:userId" component={UserPage} />
        <Route exact path='/posts' component={Posts}/>
        <Route exact path="/about" component={AboutPage} />
        <Route path='*' component={NotFound}/>
        </Switch>
      </Router>

    </section>
  );
};

export default App;