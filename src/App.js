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
            <Route exact path="/auth-test/">
              <SignUp />
            </Route>
            <Route path="/auth-test/sign-in">
              <SignIn />
            </Route>
            <Route path="/auth-test/password-reset">
              <PasswordReset />
            </Route>
            <Route path="/auth-test/new-password">
              <NewPassword />
            </Route>
            <Route path="/auth-test/confirm-email">
              <ConfirmEmail />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
     </div>
    </Router>
    
  );
}

export default App;
