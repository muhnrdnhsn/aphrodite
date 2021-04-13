import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { fileToBuffer } from '../../utils/file';
import './addcollmodal';
import axios from 'axios';

const Addcollmodal = ({collections, handleClose, show}) => {
    const history = useHistory();
    const [modalState, setModalState] = useState({
        isInvalid: false,
        name: '',
        thumbnail: '',
        filename: ''
    });

    const isNameExist = (name) => (
        collections.some(coll => coll.name.toLowerCase() === name.toLowerCase())
    )

    const handleFileChange = async (e) => {
        let filename = e.target.files[0].name
        let thumbnaildata = await fileToBuffer(e.target.files[0])
        if(!e.target.files[0]){
            filename = ''
            thumbnaildata = ''
        }
        setModalState({
            ...modalState,
            thumbnail: thumbnaildata,
            filename: filename
        })
    }
    const handleChangeName = (e) => {
        setModalState({
            ...modalState,
            name: e.target.value,
            isInvalid: isNameExist(e.target.value)
        })
    }

    const closeModal = () => {
        setModalState({isInvalid: false,
            name: '',
            thumbnail: '',
            filename: ''
        })
        handleClose('addmodal')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const collection = {
                name: modalState.name,
                thumbnail: modalState.thumbnail
            }
            axios.post('http://localhost:5000/collections/add', collection, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            }).then(() => history.push('/admin'))
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
                <Modal.Title>Add Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control type="text" isInvalid={modalState.isInvalid} placeholder="Collection name" onChange={handleChangeName}  />
                    <Form.Control.Feedback type="invalid">
                        Collection name already exist. Choose another one
                    </Form.Control.Feedback>
                    <Form.File 
                        id="custom-file"
                        label={modalState.filename ? modalState.filename : "Thumbnail image"} 
                        custom
                        className="mt-4"
                        accept="image/*"
                        multiple={false}
                        onChange={handleFileChange}
                    />
                </Form>
                {
                    modalState.thumbnail &&
                    <img width="200" height="300" src={modalState.thumbnail} alt={modalState.filename} />
                }
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary btn-action" onClick={closeModal}>Cancel</button>
                <button disabled={modalState.isInvalid || (!modalState.name) || (!modalState.thumbnail)} className="btn btn-secondary btn-action" onClick={handleSubmit}>Add</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Addcollmodal
