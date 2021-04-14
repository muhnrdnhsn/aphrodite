import React, { useState } from 'react';
import './mybag.scss';
// import dummy from '../../assets/images/dummy_item.JPG'
import {useHistory} from 'react-router-dom';
const Mybag = (props) => {
    const history = useHistory()
    const { state } = props.location
    const [mybagState, setMyBagState] = useState({
        qty: 1
    })

    const handleUp = () => {
        setMyBagState({
            ...mybagState,
            qty: mybagState.qty+1
        })
    }

    const handleDown = () => {
        setMyBagState({
            ...mybagState,
            qty: mybagState.qty-1
        })
    }
    return(
        <div className="page-container centered">
            <div className="content-card">
                <p className="text-title">MY BAG</p>
                <br/>
                <div className="row">
                    <div className="col-4 text-left text-primary">PRODUCT. DESC</div>
                    <div className="col-4 text-center text-primary">QTY</div>
                    <div className="col-4 text-right text-primary">PRODUCT. DESC</div>
                </div>
                <div className="row bd-top">
                    <div className="col-8 text-left text-bold">{state.quantity} {state.item.name.toUpperCase()}</div>
                    <div className="col-4 text-right text-bold">IDR {state.item.price * mybagState.qty}</div>
                </div>
                <div className="row">
                    <div className="col text-primary text-small">{state.material.toUpperCase()}</div>
                </div>
                <div className="row">
                    <div className="col text-primary text-small">SIZE: {state.size.toUpperCase()} </div>
                </div>
                <div className="row">
                    <div className="col-4 text-left text-primary">
                        <img src={state.item.photos[0]} width="200" alt={state.item.name}/>
                    </div>
                    <div className="col-4 text-center text-primary align-self-center">
                        <button className="btn" disabled={mybagState.qty === 1} onClick={handleDown} type="button">{"<"}</button>
                        <span>{mybagState.qty}</span>
                        <button className="btn" onClick={handleUp} type="button">{">"}</button>
                    </div>
                    <div className="col-4 text-right text-primary align-self-end">
                        <button className="btn">REMOVE</button>
                    </div>
                </div>
                <div className="row bd-top">
                    <div className="col-4 text-left text-bold text-primary">ADD PROMO CODE</div>
                    <div className="col-8 text-bold">
                        <div className="row justify-content-end">
                            <div className="form-col-8">
                                <input />
                            </div>
                            <div className="col-4">
                                <button className="btn btn-secondary btn-block">SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right mt-3">Subscribe to know our latest news & promotion</div>
                </div>
                <div className="row bd-top">
                    <div className="col-8 text-left text-bolder">TOTAL</div>
                    <div className="col-4 text-right text-bolder">IDR {state.item.price * mybagState.qty}</div>
                </div>
                <div className="row bd-top mt-3 justify-content-between">
                    <div className="col-4  text-bolder px-0">
                        <button className="btn btn-secondary btn-block" onClick={()=>history.push('/collections')}>CONTINUE SHOPPING</button>
                    </div>
                    <div className="col-4  text-bolder px-0">
                        <button className="btn btn-primary btn-block">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Mybag