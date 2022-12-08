import { React } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalsSlice';
import { useForm } from "react-hook-form";
import { addTask } from '../../store/tasksSlice';
import * as _ from 'lodash';

export default function AddModal({ param }) {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        const uniqID = param+data.taskName+_.uniqueId();
        const newTask = { day: param, id: uniqID, ...data };
        console.log(newTask)
        dispatch(addTask(newTask));
        dispatch(closeModal());
    };

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
                                {...register("taskName", { required: true, maxLength: 20 })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input1">
                            <Form.Label>Task`s start</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="dateStart"
                                defaultValue='09:00:00'
                                {...register("dateStart", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task`s end</Form.Label>
                            <Form.Control
                                type="time"
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

