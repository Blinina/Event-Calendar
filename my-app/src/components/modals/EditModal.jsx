import { React, useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { closeModal } from '../../store/modalsSlice';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { renameTask, getTasks } from '../../store/tasksSlice';



export default function EditModal() {
    const dispatch = useDispatch();
    let inputRef = useRef();
    const { register, handleSubmit } = useForm();
    const { item } = useSelector((store) => store.modals);
    const allTasks = useSelector(getTasks);
    const currentTask = allTasks.find((it) => it.id === item);
    console.log(currentTask);

    //     useEffect(()=>{
    // console.log(inputRef)
    //     }, [inputRef]);
    const onSubmit = data => {
        console.log('kek')
        const { id, day } = currentTask;
        const newTask = { day, id, ...data };
        console.log(newTask)
        dispatch(renameTask({ id, ...data }));
        dispatch(closeModal());
    };

    return (
        <>
            <Modal centered show onHide={() => dispatch(closeModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="task`s name"
                                ref={inputRef}
                                defaultValue={currentTask.taskName}
                                {...register("taskName", { required: true, maxLength: 20 })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="start">
                            <Form.Label>Task`s start</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="dateStart"
                                defaultValue={currentTask.dateStart}
                                {...register("dateStart", { required: true })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="end">
                            <Form.Label>Task`s end</Form.Label>
                            <Form.Control
                                type="time"
                                defaultValue={currentTask.dateEnd}
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

