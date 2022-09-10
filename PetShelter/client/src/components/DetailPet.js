import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const NinjaDetail = () => {
    const {id} = useParams();
    const [likes, setLikes] = useState(0)
    const history = useHistory();

    const [petInfo, setPetInfo] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pet/${id}`)
            .then(response=>{
                console.log("Response when getting ONE pet ----->", response)
                setPetInfo(response.data.results)            
            })
            .catch(err=> console.log(err))
    },[id])

    const adoptPet = () => {
        console.log("Adopting this pet ----->",id);
        axios.delete(`http://localhost:8000/api/pet/delete/${id}`)
        .then(response => {
            console.log("ADOPTED THIS PET!",response);
            history.push("/")
        })
        .catch(err => console.log(err));
    }

    const likePet = () => {
        axios.put(`http://localhost:8000/api/like/${id}`, {
            likes
        })
            .then(res => {
                console.log(res)
                
                    axios.get(`http://localhost:8000/api/pet/${id}`)
                        .then(response=>{
                            console.log("Response when getting ONE pet ----->", response)
                            setPetInfo(response.data.results)            
                        })
                        .catch(err=> console.log(err))
            })
            .catch(err => console.log(err))
            document.getElementById('button').setAttribute("disabled", "disabled");
    }

    return (
        <div>
            <Link to="/" className="btn btn-primary m-2">Back To Home</Link>
            <hr/>
            <h5>Details about: {petInfo.name}</h5>
            <button onClick={adoptPet} className= "btn btn-danger">Adopt {petInfo.name}</button>
            <hr/>
            <p>Pet Type: {petInfo.type}</p>
            <p>Description: {petInfo.description}</p>
            <p>Skills: {petInfo.skillOne}, {petInfo.skillTwo}, {petInfo.skillThree}</p>
            <p>Likes: {petInfo.likes}</p>
            <button onClick={ e => {likePet(petInfo._id)}} id="button">Like This Pet</button>
        </div>
    );
};

export default NinjaDetail;