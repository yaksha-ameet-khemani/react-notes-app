import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CreateNote from "./components/CreateNote";
import Home from "./components/Home";
import Notes from "./components/Notes";

function App() {
  return (
    <>
      <div>My Notes</div>
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>----
          <Link to="/notes">All Notes</Link>----
          <Link to="/create-note">Create Note</Link>
        </div>
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/notes"><Notes /></Route>
          <Route exact path="/create-note"><CreateNote /></Route>
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
