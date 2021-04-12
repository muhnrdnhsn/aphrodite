import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

import './collections.scss';
import { useHistory } from 'react-router-dom';



const Collections = () => {
    
    const history = useHistory();

    const [collectionState, setCollectionState] = useState({
        collections: []
    });


    useEffect(() => {
        getCollections()
    });

    const getCollections = () => {
        axios.get('http://localhost:5000/collections')
            .then(res => setCollectionState({...collectionState, collections: res.data}))
            .catch(err => console.log("Error when fetching data from database"))
    }

    const handleClick = (collection) => {
        history.push(`/collections/${collection.name}`)
    }

    // const fileToBuffer = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file)

    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         }

    //         fileReader.onerror = (error) => {
    //             reject(error)
    //         }
    //     })
    // }

    // const handleChange = async (e) => {
    //     if(e.target.id === 'thumbnail'){
    //         const data = await fileToBuffer(e.target.files[0])
    //         setCollectionState({
    //             ...collectionState,
    //             [e.target.id]: data
    //         })
    //     }else{
    //         setCollectionState({
    //             ...collectionState,
    //             [e.target.id]: e.target.value
    //         })
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     try{
    //         const collection = {
    //             name: collectionState.name,
    //             thumbnail: collectionState.thumbnail
    //         }
    //         axios.post('http://localhost:5000/collections/add', collection)
    //             .then(res => console.log(res))
    //     }catch (err){
    //         console.log(err);
    //     }
    // }

    return(
        <div>
            {collectionState.collections.length !== 0 &&
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
                            <img style={{cursor: 'pointer'}} src={collection.thumbnail} height="600" width="400" alt={collection.name} onClick={() => handleClick(collection)} />
                            <div style={{cursor: 'pointer'}} className="text-overlay-center" onClick={() => handleClick(collection)} >{collection.name}</div>
                        </div>
                    ))}
                </Carousel>
            }
        </div>
    )
}

export default Collections;