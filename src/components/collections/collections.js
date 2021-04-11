import React from 'react';
// { useEffect, useState } 
// import axios from 'axios';

const Collections = () => {
    
    // const [collectionState, setCollectionState] = useState({
    //     collections: [],
    //     name: '',
    //     thumbnail: ''
    // });


    // useEffect(() => {
    //     getCollections()
    // });

    // const getCollections = () => {
    //     axios.get('http://localhost:5000/collections')
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    // }

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
            <p>COLLECTIONS</p>
            {/* <form>
                <div className="form-group">
                    <label htmlFor="thumbnail">Example file input</label>
                    <input type="file" className="form-control-file" id="thumbnail" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" onChange={handleChange}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Upload</button>
            </form> */}
        </div>
    )
}

export default Collections;