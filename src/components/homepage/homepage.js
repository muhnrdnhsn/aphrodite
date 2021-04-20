import React from 'react';
import { useHistory } from 'react-router-dom';
import image from '../../assets/images/home.png';
import './homepage.scss'

const Homepage = () => {
    const history = useHistory()
    return(
        <div className="container no-gutter">
            <div className="row px-10">
                <div className="col">
                    <p className="text-h4">FROM THE MOST BEAUTIFULL LAND WITH THOUSANDS OF CULTURE, INDONESIA</p>
                    <p className="text-h2">CARVING YOUR PERFECT JEWERLY</p>
                    <p className="text-h1">Aphrodite</p>
                    <p className="text-h3">PERSONALIZE &#183; TRY IT ON &#183; PERFECT</p>
                    <form action="https://instagram.com/her.aphrodite/">
                        <button className="btn btn-primary lg-btn" type="submit">TRY OUR AR!</button>
                        <button className="btn btn-primary lg-btn" onClick={() => history.push('/collections')} type="button">SHOP NOW</button>
                    </form>
                </div>
                <div className="col">
                    <img src={image} alt="Aphrodite" height="700"/>
                </div>
            </div>
        </div>
    )
}

export default Homepage;