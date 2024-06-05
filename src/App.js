import { Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import MainNavigation from "./components/Layout/MainNavigation";
import { useSelector } from "react-redux";
import Signup from "./pages/Auth/Signup";
import Forgotpass from "./pages/Auth/Forgotpass";

function App() {
  const isAuthentication = useSelector(state => state.auth.isAuthenticated)
  // console.log(isAuthentication)

  return (
   <>
      <Switch>
        <Route exact path="/" component={Signup} />
       
        <Route path='/forgotpass' component={Forgotpass}/>
        
        {isAuthentication ? (
          <Route path="/mainnavigation" component={MainNavigation} />
        ) : (
          <Redirect to="/" />
        )}

        <Redirect to="/" />
      </Switch>
   </>
  );
}

export default App;
