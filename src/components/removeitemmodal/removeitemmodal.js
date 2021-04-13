import React from 'react'
import { Modal } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom';
import './removeitemmodal.scss';
import axios from 'axios';

const Removemodal = ({selected, handleClose, show}) => {
    // const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const item = {
                id: selected._id
            }
            axios.delete('http://localhost:5000/items', {
                headers: {
                    'token': localStorage.getItem('token')
                },
                data: {
                    id: item.id
                }
            }).then(() => {
                handleClose('removemodal', true)
            })
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
                <Modal.Title>Remove Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete <b>{selected ? selected.name : ''}</b> Item ?. This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary btn-action" onClick={handleSubmit}>Delete</button>
                <button className="btn btn-secondary btn-action" onClick={()=>handleClose('removemodal', false)}>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Removemodal
