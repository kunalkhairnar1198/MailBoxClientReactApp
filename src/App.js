import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./components/pages/Auth/Signup";
import MainNavigation from "./components/Layout/MainNavigation";
import Compose from "./components/pages/MailComponent/Compose";
import Inbox from "./components/pages/MailComponent/Inbox/Inbox";

function App() {
  return (
   <>
      <Switch>
        <Route exact path='/' component={Signup} />
        <Route  path='/mainnavigation' component={MainNavigation} />
        <Route  path='/compose' component={Compose} />
        <Route path='/inbox' component={Inbox}/>
      </Switch>
   </>
  );
}

export default App;
