import React, {useContext, useState} from "react";
import {AuthContext} from "../../services/auth";
import {Alert, Button, Dropdown, Modal} from "react-bootstrap";


export default function DeletePostModal(props) {
    const [show, setShow] = useState(false);
    const userContext = useContext(AuthContext);


    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
        <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Post
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Modal.Footer>

                        {/*<Button variant="primary" onClick={handleClose}>*/}
                        {/*    Save Changes*/}
                        {/*</Button>*/}


                    </Modal.Footer>

                </Modal.Body>

            </Modal>
        </React.Fragment>
        </React.Fragment>
    );
}


