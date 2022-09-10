import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const AllPets = (props) => {
    const [allPets, setAllPets] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(response => {
                console.log("Response when getting all pets in shelter -----> ", response);
                setAllPets(response.data.results);
            })
            .catch(err => console.log("ERROR! -----> ", err));
    }, [])

    return (
        <div>
            <h5>These pets are looking for a good home!</h5>
            <Link to="/pet/new" className="btn btn-primary m-2">Add Pet To Shelter</Link>
            <hr/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                        {
                            allPets.map((pet, idx) => {
                                return (
                                    <div key={idx} >
                                        <th scope="row">{pet.name}</th>
                                        <td>{pet.type}</td>
                                        <td>
                                            <Link to={`/pet/${pet._id}`}>details</Link> |
                                            <Link to={`/pet/edit/${pet._id}`}>edit</Link>
                                        </td>
                                    </div>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AllPets;