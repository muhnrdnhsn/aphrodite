import React, { useEffect, useState } from 'react'
import dummy from '../../assets/images/dummy_item.JPG';
import axios from 'axios';
import { Carousel, Spinner } from 'react-bootstrap';
import './itemdetail.scss';
import {useHistory} from 'react-router-dom';

const ItemDetail = (props) => {
    const history = useHistory()
    const collname = props.match.params.name
    const itemid = props.match.params.id

    const [state, setState] = useState({
        isLoading: true,
        item: {},
        material: '-',
        size: '-',
        quantity: '-'
    })

    const getData = async () => {
        try{
            const item = await axios.get(`${process.env.REACT_APP_BE_URL}/items/${itemid}`)
            setState({...state, isLoading: false, item: item.data})
        }catch(err){
            // setState({...state, isLoading: false, error: 'Error when fetching data from database'})
        }
    }

    useEffect(() => {
        if(state.isLoading){
            getData()
        }
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }
    return(
        <div className="container no-gutter">
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
                    <div className="media">
                        <Carousel slide={false} indicators={false} controls={state.item.photos.length > 1}>
                            {
                                state.item.photos.map((photo, i) => (
                                    <Carousel.Item key={i}>
                                        <img src={photo ? photo : dummy} className="align-self-center mr-3" alt={state.item.name} height="600" width="400" />
                                    </Carousel.Item>
                                ))
                            }
                            
                        </Carousel>
                        {/* <img src={state.item.photos[0] ? state.item.photos[0] : dummy} className="align-self-center mr-3" alt="dummy" height="600" /> */}
                        <div className="media-body">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/collections">COLLECTIONS</a></li>
                                    <li className="breadcrumb-item"><a href={`/collections/${collname}`}>{collname.toUpperCase()}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{state.item.name.toUpperCase()}</li>
                                </ol>
                            </nav>
                            <h1 className="mt-0 h1-text">{state.item.name.toUpperCase()}</h1>
                            <h4 className="mt-0 h4-text">IDR {state.item.price}</h4>
                            <p className="mb-0" style={{paddingRight:"60%"}}>{state.item.shortdescription}</p>
                            <p className="mb-0">Measurement:</p>
                            <p className="mb-4">Approx. {state.item.dimension.split(";").join(" x ")}</p>
                            <h4 className="mt-3 mb-0 h4-text">DETAILS & CARE</h4>
                            <p className="mb-0">{state.item.description}</p>
                            <hr/>
                            <div className="row">
                                <div className="col-8">
                                    <div className="form-group row ml-0 mb-1">
                                        <div className="col-4 px-0">
                                            <label htmlFor="material">MATERIAL</label>
                                        </div>
                                        <div className="col-8">
                                            <select className="form-control" id="material" value={state.material} onChange={handleChange}>
                                                <option value="-" disabled>SELECT PLATED</option>
                                                {
                                                    state.item.materials.map((mat, i) => <option key={i} value={mat}>{mat}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row ml-0 mb-1">
                                        <div className="col-4 px-0">
                                            <label htmlFor="size">SIZE</label>
                                        </div>
                                        <div className="col-8">
                                            <select className="form-control" id="size" value={state.size} onChange={handleChange}>
                                                <option value="-" disabled>SELECT SIZE</option>
                                                {
                                                    state.item.sizes.map((size,i) => <option key={i} value={size}>{size}</option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row ml-0">
                                        <div className="col-4 px-0">
                                            <label htmlFor="quantity">QUANTITY</label>
                                        </div>
                                        <div className="col-8">
                                            <select className="form-control" id="quantity" value={state.quantity} onChange={handleChange}>
                                                <option value="-" disabled>SELECT QUANTITY</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                            </select>
                                        </div>
                                    </div>
        
                                </div>
                                <div className="col-4">
                                    {
                                        state.material !== '-' && state.size !== '-' && state.quantity !== '-' &&
                                        <button className="btn btn-primary btn-block btn-lg">TRY IT ON!</button>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <button 
                                        disabled={!(state.material !== '-' && state.size !== '-' && state.quantity !== '-')} 
                                        className="btn btn-primary btn-block btn-md"
                                        onClick={() => history.push('/mybag', state)}
                                    >
                                        ADD TO BAG
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-block btn-md btn-gray" onClick={()=> history.push(`/collections/${collname}`)}>BACK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ItemDetail