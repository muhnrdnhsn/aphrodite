import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom';
// import { fileToBuffer } from '../../utils/file';
import './edititemmodal.scss';
import axios from 'axios';

const Edititemmodal = ({collections, selected, handleClose, show}) => {
    // const history = useHistory();
    const [modalState, setModalState] = useState(selected);


    const handleChange = (e) => {
        setModalState({
            ...modalState,
            [e.target.id]: e.target.value
        })
    }

    const closeModal = (refresh) => {
        setModalState({
            name: '',
            price: '',
            dimension: '',
            materials: '',
            sizes: '',
            description: '',
            shortdescription: '',
            collectionID: ''
        })
        handleClose('editmodal', refresh)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const body = {
                data: modalState,
                id: selected._id
            }
            axios.post(`${process.env.REACT_APP_BE_URL}/items/edit`, body, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(() => closeModal(true))
        }catch (err){
            console.log(err);
        }
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="justify-content-center">
                <Modal.Title>Edit Items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={modalState.name} type="text" placeholder="Item name" id="name" onChange={handleChange} className="mb-2" />
                    <Form.Control value={modalState.price} type="text" placeholder="Item price" id="price" onChange={handleChange} className="mb-2"  />
                    <Form.Control value={modalState.dimension} type="text" placeholder="Item dimension (format: w;h;d)" id="dimension" onChange={handleChange} className="mb-2"  />
                    <Form.Control value={modalState.materials} type="text" placeholder="Materials (separate value by semicolon ';')" id="materials" onChange={handleChange} className="mb-2"  />
                    <Form.Control value={modalState.sizes} type="text" placeholder="Sizes (separate value by semicolon ';')" id="sizes" onChange={handleChange} className="mb-2"  />
                    <Form.Control value={modalState.shortdescription} as="textarea" rows={2} placeholder="Item short description" id="shortdescription" onChange={handleChange} className="mb-2"  /> 
                    <Form.Control value={modalState.description} as="textarea" rows={5} placeholder="Item description" id="description" onChange={handleChange} className="mb-2"  /> 
                    <Form.Label style={{fontSize: '15px'}}>Collection</Form.Label>
                    <Form.Control value={modalState.collectionID} as="select" id="collectionID" onChange={handleChange} className="mb-2"  >
                    {
                        collections.map(coll => <option key={coll._id} value={coll._id}>{coll.name}</option>)
                    }
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary btn-action" onClick={() => closeModal(false)}>Cancel</button>
                <button 
                    disabled={
                        modalState.name === '' ||
                        modalState.price === '' ||
                        modalState.dimension === '' ||
                        modalState.materials === '' ||
                        modalState.sizes === '' ||
                        modalState.description === '' ||
                        modalState.shortdescription === '' ||
                        modalState.collectionID === ''
                    } 
                    className="btn btn-secondary btn-action" 
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default Edititemmodal
