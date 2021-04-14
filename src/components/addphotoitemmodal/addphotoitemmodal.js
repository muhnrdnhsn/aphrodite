import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { fileToBuffer } from '../../utils/file';
import './addphotoitemmodal.scss';
import axios from 'axios';

const Addphotoitemmodal = ({selected, handleClose, show}) => {
    const [modalState, setModalState] = useState({
        thumbnail: '',
        filename: ''
    });

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
    

    const closeModal = (refresh) => {
        setModalState({
            thumbnail: '',
            filename: ''
        })
        handleClose('photomodal', refresh)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            const body = {
                photo: modalState.thumbnail,
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
                <Modal.Title>Add Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.File 
                        id="custom-file"
                        label={modalState.filename ? modalState.filename : "Item image"} 
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
                <button className="btn btn-primary btn-action" onClick={() => closeModal(false)}>Cancel</button>
                <button disabled={!modalState.thumbnail} className="btn btn-secondary btn-action" onClick={handleSubmit}>Add</button>
            </Modal.Footer>
        </Modal>
    )
}

export default Addphotoitemmodal
