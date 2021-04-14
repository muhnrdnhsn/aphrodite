import React, { useEffect, useState } from 'react';
import './items.scss';
// import dummy from '../../assets/images/dummy_item.JPG';
import axios from 'axios'
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const Items = (props) => {
    const history = useHistory()
    useEffect(() => {
        if(itemsState.isLoading){
            getData()
        }
    })
    const [itemsState, setItemsState] = useState({
        collectionName: props.match.params.name,
        perpage: 6,
        page: 1,
        totalpage: 1,
        minpage: 1,
        maxpage: 1,
        isLoading: true,
        items: []
    });

    const setPerPage = (value) => {
        setItemsState({
            ...itemsState,
            perpage: value
        })
    }

    const getData = async () => {
        try{
            const coll = await axios.get(`${process.env.REACT_APP_BE_URL}/collections/${itemsState.collectionName}`)
            const items = await axios.get(`${process.env.REACT_APP_BE_URL}/items/collection/${coll.data._id}`)
            setItemsState({...itemsState, isLoading: false, items: items.data})
        }catch(err){
            // setState({...state, isLoading: false, error: 'Error when fetching data from database'})
        }
    }
    return (
        <div className="container no-gutters">
            <div className="row mx-4 px-4 mb-4">
                <div className="col">
                    {/* Filter */}
                </div>
                <div className="col-6 text-title">
                    {itemsState.collectionName.toUpperCase()}
                </div>
                <div className="col text-header">
                    <span className={"clickable" + (itemsState.perpage === 6 ? " active-link" : "")} id="perpage" onClick={()=>setPerPage(6)}>6</span>
                    <span> / </span>
                    <span className={"clickable" + (itemsState.perpage === 12 ? " active-link" : "")} onClick={()=>setPerPage(12)}>12</span>
                    <span> / </span>
                    <span className={"clickable" + (itemsState.perpage === 24 ? " active-link" : "")} onClick={()=>setPerPage(24)}>24</span>
                </div>
            </div>
                {
                    itemsState.isLoading ? 
                    (
                        <div className="row justify-content-center centered">
                            <Spinner animation="grow" variant="primary" className="mr-4"/>
                            <Spinner animation="grow" variant="primary" className="mr-4"/>
                            <Spinner animation="grow" variant="primary" className="mr-4"/>
                        </div>
                    )
                    :
                    (
                        <div className="row px-4 mx-4 mb-4">
                            {itemsState.items.map(item => (
                                <div key={item._id} className="col-4 mb-4">
                                    <img style={{cursor: 'pointer'}} src={item.photos[0]} width="100%" height="600" alt={item.name} onClick={() => history.push(`/collections/${itemsState.collectionName}/${item._id}`)} />
                                    <p className="text-item">{item.name.toUpperCase()}</p>
                                    <p className="text-item">IDR {item.price}</p>
                                </div>
                            ))}
                        </div>
                    )
                }

            {/* <div className="row justify-content-center bd-top">
                <nav>
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <p className="page-link" tabIndex="-1" >PREV</p>
                        </li>
                        <li className="page-item active"><p className="page-link" >1</p></li>
                        <li className="page-item"><p className="page-link" >2</p></li>
                        <li className="page-item"><p className="page-link" >3</p></li>
                        <li className="page-item">
                            <p className="page-link" href="/" >NEXT</p>
                        </li>
                    </ul>
                </nav>
            </div> */}

        </div>
    )
}

export default Items;