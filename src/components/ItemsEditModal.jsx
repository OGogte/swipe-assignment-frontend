import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ItemsEditModal = ({ open, onClose, onSaveItem, items, handleItems, handleDeleteItem }) => {
    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Items</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className=" d-flex gap-2 align-items-center justify-content-between ">
                    <h5> Name</h5>
                    <h5>Description</h5>
                    <h5>Quantity</h5>
                    <h5>Price</h5>
                    <h5>Actions</h5>
                </div>
                {items.map((item, id) => (
                    <div className=" d-flex gap-2 align-items-center justify-content-between "
                        key={id}
                    >
                        <Form.Control
                            className=" text-center bg-white border border-dark"
                            type="text"
                            value={item.itemName}
                            name="itemName"
                            onChange={(e) =>
                                handleItems(id, e.target.name, e.target.value)
                            }
                            required
                        />
                        <Form.Control
                            className=" text-center bg-white border border-dark"
                            type="text"
                            value={item.itemDescription}
                            name="itemDescription"
                            onChange={(e) =>
                                handleItems(id, e.target.name, e.target.value)
                            }
                            required
                        />
                        <Form.Control
                            className=" text-center bg-white border border-dark"
                            type="number"
                            value={item.itemQuantity}
                            name="itemQuantity"
                            onChange={(e) =>
                                handleItems(id, e.target.name, e.target.value)
                            }
                            required
                        />
                        <Form.Control
                            className=" text-center bg-white border border-dark"
                            type="number"
                            value={item.itemPrice}
                            name="itemPrice"
                            onChange={(e) =>
                                handleItems(id, e.target.name, e.target.value)
                            }
                            required
                        />
                        <Button
                            variant="danger"
                            className=" text-center border border-dark"
                            onClick={() => handleDeleteItem(id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={onSaveItem}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ItemsEditModal;