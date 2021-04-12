import React, { useState } from 'react';
import './items.scss';
import dummy from '../../assets/images/dummy_item.JPG';
const Items = (props) => {

    const [itemsState, setItemsState] = useState({
        collectionName: props.match.params.name,
        perpage: 6,
        page: 1
    });

    const setPerPage = (value) => {
        setItemsState({
            ...itemsState,
            perpage: value
        })
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
            <div className="row px-4 mx-4 mb-4">
                <div className="col-4 mb-4">
                    <img src={dummy} width="100%" height="600" alt="dummy" />
                    <p className="text-item">BATARA RATIH</p>
                    <p className="text-item">IDR 250,000</p>
                </div>
                <div className="col-4 mb-4">
                    <img src={dummy} width="100%" height="600" alt="dummy" />
                    <p className="text-item">BATARA RATIH</p>
                    <p className="text-item">IDR 250,000</p>
                </div>
                <div className="col-4 mb-4">
                    <img src={dummy} width="100%" height="600" alt="dummy" />
                    <p className="text-item">BATARA RATIH</p>
                    <p className="text-item">IDR 250,000</p>
                </div>
                <div className="col-4 mb-4">
                    <img src={dummy} width="100%" height="600" alt="dummy" />
                    <p className="text-item">BATARA RATIH</p>
                    <p className="text-item">IDR 250,000</p>
                </div>
                <div className="col-4 mb-4">
                    <img src={dummy} width="100%" height="600" alt="dummy" />
                    <p className="text-item">BATARA RATIH</p>
                    <p className="text-item">IDR 250,000</p>
                </div>
                <div className="col-4 mb-4">
                    <img src={dummy} width="100%" height="600" alt="dummy" />
                    <p className="text-item">BATARA RATIH</p>
                    <p className="text-item">IDR 250,000</p>
                </div>
            </div>

            <div className="row justify-content-center bd-top">
                <nav>
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <p className="page-link" tabindex="-1" >PREV</p>
                        </li>
                        <li className="page-item active"><p className="page-link" >1</p></li>
                        <li className="page-item"><p className="page-link" >2</p></li>
                        <li className="page-item"><p className="page-link" >3</p></li>
                        <li className="page-item">
                            <p className="page-link" href="/" >NEXT</p>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default Items;