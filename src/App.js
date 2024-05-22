import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./components/pages/Auth/Signup";
import MainNavigation from "./components/Layout/MainNavigation";
import Compose from "./components/pages/MailComponent/Compose";

function App() {
  return (
   <>
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route  path='/mainnavigation' component={MainNavigation} />
        <Route  path='/compose' component={Compose} />
      </Switch>
   </>
  );
}

export default App;
