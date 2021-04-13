import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import './admincollections.scss';
import axios from 'axios';
import Addcollmodal from '../addcollmodal/addcollmodal';
import Removemodal from '../removecollmodal/removecollmodal';
import Editcollmodal from '../editcollmodal/editcollmodal';
import { useHistory } from 'react-router-dom';

const AdminCollections = () => {
    const history = useHistory()
    useEffect(() => {
        if(state.isLoading){
            getCollections();
        }
        axios.get('http://localhost:5000/auth/login', {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            if(!res.data.auth){
                history.push('/login')  
            }
        }).catch(() => history.push('/login'))
    })

    const handleRemove = (collection) => {
        setState({
            ...state,
            removemodal: true,
            selected: collection
        })
    }

    const handleEdit = (collection) => {
        setState({
            ...state,
            editmodal: true,
            selected: collection
        })
    }

    const [state, setState] = useState({
        isLoading: true,
        collections: [],
        error: '',
        addmodal: false,
        removemodal: false,
        editmodal: false,
        selected: null
    });

    const handleClose = (modalname) => {
        setState({
            ...state,
            [modalname]: false,
            selected: null
        })
    }

    const handleShow = (modalname) => {
        setState({
            ...state,
            [modalname]: true
        })
    }

    const getCollections = () => {
        axios.get('http://localhost:5000/collections')
            .then(res => setState({...state, isLoading: false, collections: res.data}))
            .catch(err => setState({...state, isLoading: false, error: 'Error when fetching data from database'}))
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-between">
                <div className="col-2">
                    <button className="btn btn-dark" onClick={() => handleShow('addmodal')}>ADD NEW COLLECTION</button>
                </div>
                <div className="col-4">
                {/* <input type="text" className="form-control" id="email-subs" placeholder="Search..."></input> */}
                </div>
            </div>
            {
                state.isLoading ?
                (
                    <div className="row justify-content-center centered">
                        <Spinner animation="grow" variant="primary" className="mr-4"/>
                        <Spinner animation="grow" variant="primary" className="mr-4"/>
                        <Spinner animation="grow" variant="primary" className="mr-4"/>
                    </div>

                )
                :
                (
                    <div className="row mt-4">
                        {
                            state.collections.map(collection => (
                                <div className="col-3 mb-4" key={collection._id}>
                                    <div className="cardadmin-container">
                                        <img src={collection.thumbnail} width="300" height="400" alt="coll" />
                                        <div style={{cursor: 'default'}} className="text-overlay-center" >{collection.name}</div>
                                        <button className="btn btn-secondary btn-action" onClick={() => handleEdit(collection)}>Edit</button>
                                        <button className="btn btn-primary btn-action" onClick={() => handleRemove(collection)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                )
            }
            <Addcollmodal collections={state.collections} show={state.addmodal} handleClose={handleClose} />
            <Removemodal selected={state.selected} handleClose={handleClose} show={state.removemodal} />
            {
                state.selected && <Editcollmodal selected={state.selected} handleClose={handleClose} show={state.editmodal} collections={state.collections} />
            }
        </div>
    )
}

export default AdminCollections;
