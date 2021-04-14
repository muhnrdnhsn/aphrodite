import React from 'react'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import './removecollmodal.scss';
import axios from 'axios';

const Removemodal = ({selected, handleClose, show}) => {
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const collection = {
                name: selected.name
            }
            axios.delete(`${process.env.REACT_APP_BE_URL}/collections`, {
                headers: {
                    'token': localStorage.getItem('token')
                },
                data: {
                    name: collection.name
                }
            }).then(() => history.push('/admin'))
        }catch (err){
            console.log(err);
        }
    }

    return (
        <Modal
            show={show}
            onHide={() => handleClose('removemodal')}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="justify-content-center">
                <Modal.Title>Remove Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete <b>{selected ? selected.name : ''}</b> Collection ?. This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary btn-action" onClick={handleSubmit}>Delete</button>
                <button className="btn btn-secondary btn-action" onClick={()=>handleClose('removemodal')}>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Removemodal
