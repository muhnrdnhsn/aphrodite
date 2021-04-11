import React from 'react'
import './footer.scss';
const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="list-unstyled">
                            <li>How to shop</li>
                            <li>FAQs</li>
                            <li>Lifetime Warranty</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-unstyled">
                            <li>Try it on!</li>
                            <li>Return & Exchange</li>
                            <li>Materials & Care</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-unstyled">
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>WhatsApp</li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <form>
                            <div className="form-row justify-content-end">
                                <label>Subscribe to know our latest news & promotion</label>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-9">
                                    <input type="email" className="form-control" id="email-subs" placeholder="Enter your email address here"></input>
                                </div>
                                <div className="col-lg-3">
                                    <button type="submit" className="btn btn-block btn-dark">SUBSCRIBE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;