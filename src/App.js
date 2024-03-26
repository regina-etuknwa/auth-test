// import { BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import NewPassword from "./NewPassword";
import PasswordReset from "./PasswordReset";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


function App() {
  return (
    <div className="App">
      <SignUp />
      <SignIn />
      <PasswordReset />
      <NewPassword />
    </div>
  );
}

export default App;
