import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const NewPet = (props) => {
    const history = useHistory()

    const [formInfo, setFormInfo] = useState({
        name: "",
        type: "",
        description: "",
        skillOne: "",
        skillTwo: "",
        skillThree: ""
    })

    const [formErrors, setFormErrors] = useState({
        name: "",
        type: "",
        description: "",
        skillOne: "",
        skillTwo: "",
        skillThree: ""
    })

    const changeHandler = (e) => {
        console.log("Changing the form!");
        setFormInfo({
                ...formInfo,
                [e.target.name]: e.target.value
            })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/pet", formInfo)
        .then(response => {
            console.log("Posting this pet!-----> ", response);
            if(response.data.err){
                setFormErrors(response.data.err.errors)
            }else{
                props.setFormSubmitted(!props.formSubmitted);
    
                setFormInfo({
                    name: "",
                    type: "",
                    description: "",
                    skillOne: "",
                    skillTwo: "",
                    skillThree: ""
                })
                
                setFormErrors({
                    name: "",
                    type: "",
                    description: "",
                    skillOne: "",
                    skillTwo: "",
                    skillThree: ""
                })

                history.push("/")
            }
        })
        .catch(err => console.log("ERROR SUBMITTING POST REQUEST! -----> ", err));
}

    return (
        <div>
            <h5>Know a pet needing a home?</h5>
            <Link to="/" className="btn btn-primary m-2">Back To Home</Link>
            <hr/>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Pet Name: </label>
                    <input onChange={changeHandler} type="text" className="form-control" name="name" value={formInfo.name}/>
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Type: </label>
                    <input onChange={changeHandler} type="text" className="form-control" name="type" value={formInfo.type}/>
                    <p className="text-danger">{formErrors.type?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Pet Description: </label>
                    <input onChange={changeHandler} type="text" className="form-control" name="description" value={formInfo.description}/>
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>

                <h6>Skills (optional)</h6>
                <div className="form-group">
                    <label htmlFor="">Skill 1: </label>
                    <input onChange={changeHandler} type="text" className="form-control" name="skillOne" value={formInfo.skillOne}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Skill 2: </label>
                    <input onChange={changeHandler} type="text" className="form-control" name="skillTwo" value={formInfo.skillTwo}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Skill 3: </label>
                    <input onChange={changeHandler} type="text" className="form-control" name="skillThree" value={formInfo.skillThree}/>
                </div>
                <input type="submit" value="Add Pet" className="btn btn-success mt-3" />
            </form>
        </div>
    );
};

export default NewPet;