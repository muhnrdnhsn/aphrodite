import React from 'react';
import './aboutus.scss';
import image from '../../assets/images/aboutus.jpg'
const AboutUs = () => {
    return(
        <div className="d-flex flex-column align-items-center main-content">
            <p className="title">This Is Our Story!</p>
            <img
                src={image}
                width="512"
                className="align-items-center"
                alt="Vladimir Prostran"
            />
            <p className="text">
                Inspired by the diversity of our own culture, beautiful Indonesia. We are 4
                Indonesian women with our own uniqueness and diversity is what unite us.
                This is Aphrodite, jewelries built with beauty, love, and elegance.
            </p>
            <p className="text">
                We come to deliver women the existence of science technology, beauty, and
                culture at one place. With hypoallergenic materials we want to ensure the
                hearts of women to trust us in providing safe accessories for skin along with
                delivering style.
            </p>
            <p className="text">
                Also, by bringing Indonesian culture as the series of design, we want to
                participate in conserving and re-introduce that culture in this area.
            </p>
            <p className="text">
                Aphrodite wants to deliver a new buying experience for the customers by
                implementing Augmented Reality (AR) in order to virtually try on the
                accessories through our website.
            </p>
            <p className="text">
                <b>
                    With love,
                    <br/>
                    Aphrodite
                </b>
            </p>
        </div>
    )
}

export default AboutUs;