import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/modalsSlice';
import { useForm } from "react-hook-form";

export default function AddModal({prop}) {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
    }
    const getDefaultStartDay = () =>{
        function setMonth() { return (prop.getMonth()+1) <10 ? `0${prop.getMonth()+1}` : (prop.getMonth()+1)} ;
        function setDay() {return (prop.getDate()) <10 ? `0${prop.getDate()}` : (prop.getDate()) };
        return `${prop.getFullYear()}-${setMonth()}-${setDay()}`;
    }
    return (
        <>
            <Modal centered show onHide={() => dispatch(closeModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>New task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="task`s name"
                                autoFocus
                                {...register("firstName", { required: true, maxLength: 20 })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input1">
                            <Form.Label>Task`s start</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="dateStart"
                                defaultValue={getDefaultStartDay()}
                                {...register("dateStart", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task`s end</Form.Label>
                            <Form.Control
                                type="date"
                                {...register("dateEnd", { required: false })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => dispatch(closeModal())} variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

