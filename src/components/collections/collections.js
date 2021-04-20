import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import './collections.scss';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';



const Collections = () => {
    
    const history = useHistory();

    const [collectionState, setCollectionState] = useState({
        collections: [],
        isLoading: true,
        error: ''
    });


    useEffect(() => {
        if(collectionState.isLoading){
            getCollections()
        }
    });

    const getCollections = () => {
        axios.get(`${process.env.REACT_APP_BE_URL}/collections`)
            .then(res => setCollectionState({...collectionState, collections: res.data, isLoading:false}))
            .catch(err => setCollectionState({...collectionState, isLoading: false, error: 'Error when fetching data from database'}))
    }

    const handleClick = (collection) => {
        history.push(`/collections/${collection.name}`)
    }


    return(
        <div>
            {
                collectionState.isLoading ?
                (
                    <div className="row justify-content-center centered">
                    <Spinner animation="grow" variant="primary" className="mr-4"/>
                    <Spinner animation="grow" variant="primary" className="mr-4"/>
                    <Spinner animation="grow" variant="primary" className="mr-4"/>
                    </div>
                )
                :
                (

                    collectionState.collections.length !== 0 &&
                    <Carousel
                        responsive={{
                            desktop:{ 
                                breakpoint: {max: 3000, min:0},
                                items: 3
                            }
                        }}
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        autoPlay={false}
                        keyBoardControl={false}

                    >
                        {collectionState.collections.map(collection => (
                            <div className="card-container" key={collection._id}>
                                <img style={{cursor: 'pointer', width: '100%', height: 600}} src={collection.thumbnail}  alt={collection.name}  />
                                <div className="card-textoverlay" onClick={() => handleClick(collection)}>
                                    <div style={{cursor: 'pointer'}} className="text-overlay-center" onClick={() => handleClick(collection)} >{collection.name}</div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                )
            }
        </div>
    )
}

export default Collections;