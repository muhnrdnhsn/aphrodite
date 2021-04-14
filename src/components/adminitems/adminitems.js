import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import './adminitems.scss';
import axios from 'axios';
import Removemodal from '../removeitemmodal/removeitemmodal';
import Additemmodal from '../additemmodal/additemmodal';
import Edititemmodal from '../edititemmodal/edititemmodal';
import Addphotoitemmodal from '../addphotoitemmodal/addphotoitemmodal';
import {useHistory} from 'react-router-dom';

const AdminItems = () => {
    const history = useHistory();

    useEffect(() => {
        if(state.isLoading){
            getData();
        }
        axios.get(`${process.env.REACT_APP_BE_URL}/auth/login`, {
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



    

    const [state, setState] = useState({
        isLoading: true,
        collections: [],
        items: [],
        error: '',
        addmodal: false,
        removemodal: false,
        editmodal: false,
        selected: null,
        photomodal: false
    });

    const handleClose = (modalname, refresh) => {
        setState({
            ...state,
            [modalname]: false,
            selected: null,
            isLoading: refresh
        })
    }

    const handleShow = (modalname, selected) => {
        setState({
            ...state,
            [modalname]: true,
            selected: selected
        })
    }

    const getData = async () => {
        
        try{
            const colls = await axios.get(`${process.env.REACT_APP_BE_URL}/collections`)
            const items = await axios.get(`${process.env.REACT_APP_BE_URL}/items`)
            setState({...state, isLoading: false, collections: colls.data, items: items.data})
        }catch(err){
            setState({...state, isLoading: false, error: 'Error when fetching data from database'})
        }
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-between">
                <div className="col-2">
                    <button className="btn btn-dark" onClick={() => handleShow('addmodal', null)}>ADD NEW ITEM</button>
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
                state.items.length !== 0 ?
                (
                    <div className="row mt-4 mx-1">
                        <Table striped bordered hover size="sm" variant="primary">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Dimension</th>
                                    <th>Collection</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.items.map((item, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.dimension}</td>
                                            <td>{
                                                state.collections.filter((coll) => coll._id === item.collectionID)[0].name
                                            }</td>
                                            <td>
                                                <span className="text-link" onClick={() => handleShow('editmodal', item)}>Edit</span>
                                                <span> | </span>
                                                <span className="text-link" onClick={() => handleShow('photomodal', item)}>Add Photo</span>
                                                <span > | </span>
                                                <span className="text-link" onClick={() => handleShow('removemodal', item)}>Delete</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                )
                :
                (
                    <div className="row justify-content-center centered">
                        <div className="bold-text">NO ITEMS</div>
                    </div>
                )
            }
            <Additemmodal collections={state.collections} show={state.addmodal} handleClose={handleClose} />
            <Removemodal selected={state.selected} handleClose={handleClose} show={state.removemodal} />
            {
                state.selected && <Addphotoitemmodal selected={state.selected} handleClose={handleClose} show={state.photomodal} />
            }
            {
                state.selected &&  <Edititemmodal selected={state.selected} handleClose={handleClose} show={state.editmodal} collections={state.collections} />
            }
        </div>
    )
}

export default AdminItems;
