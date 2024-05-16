import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./components/pages/Auth/Signup";

function App() {
  return (
   <>
      <h1 className='text-7xl text-center'>MailBox Client </h1>
      <Switch>
        <Route path='/' component={Signup}/>  
      </Switch>
   </>
  );
}

export default App;
