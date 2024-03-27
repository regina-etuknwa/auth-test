import { BrowserRouter as Router , Switch ,  Route } from 'react-router-dom';
import ConfirmEmail from "./ConfirmEmail";
import NewPassword from "./NewPassword";
import PasswordReset from "./PasswordReset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from './NotFound';


function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path="/">
              <SignUp />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/password-reset">
              <PasswordReset />
            </Route>
            <Route path="/new-password">
              <NewPassword />
            </Route>
            <Route path="/confirm-email">
              <ConfirmEmail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
      {/* <SignUp />
      <SignIn />
      <PasswordReset />
      <NewPassword />
      <ConfirmEmail /> */}
     </div>
    </Router>
    
  );
}

export default App;
