import './App.css';
import React, {useState} from "react";
import{
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import AllPets from "./components/AllPets";
import NewPet from "./components/NewPet";
import DetailPet from "./components/DetailPet";
import EditPet from "./components/EditPet";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Pet Shelter</h1>
        <hr/>
        <Switch>
          <Route exact path="/">
            <AllPets formSubmitted = {formSubmitted}/>
          </Route>
          <Route exact path="/pet/new">
            <NewPet formSubmitted = {formSubmitted} setFormSubmitted = {setFormSubmitted}/>
          </Route>
          <Route exact path="/pet/:id">
            <DetailPet/>
          </Route>
          <Route exact path="/pet/edit/:id">
            <EditPet formSubmitted = {formSubmitted} setFormSubmitted = {setFormSubmitted}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
