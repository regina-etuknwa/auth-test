import { BrowserRouter as Router , Switch ,  Route } from 'react-router-dom';
import ConfirmEmail from "./ConfirmEmail";
import NewPassword from "./NewPassword";
import PasswordReset from "./PasswordReset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from './NotFound';
import HomePage from './HomePage';
import EditProfile from './EditProfile';


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
            <Route path="/auth-test/new-password/:Email/:Token*">
              <NewPassword />
            </Route>
            <Route path="/auth-test/confirm-email/:token">
              <ConfirmEmail />
            </Route>
            <Route path="/auth-test/home-page">
              <HomePage />
            </Route>
            <Route path="/auth-test/edit-profile">
              <EditProfile />
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
