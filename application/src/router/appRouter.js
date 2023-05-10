import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders} from '../components';
import { useSelector } from 'react-redux';
import GuardedRoute from './guardedRoute';

const AppRouter = (props) => {
  const auth = useSelector(state => state.auth);
  const isLoggedIn = auth.token ? true: false;

  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact render={({history})=>{
        return isLoggedIn ? <Redirect push to="/view-orders" /> : <Login history={history}/> ;
      }} />
      <GuardedRoute path="/order" exact component={OrderForm} isLoggedIn={isLoggedIn}/>
      <GuardedRoute path="/view-orders" exact component={ViewOrders} isLoggedIn={isLoggedIn}/>
    </Router>
  );
}

export default AppRouter;
