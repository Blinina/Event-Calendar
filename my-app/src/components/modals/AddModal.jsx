import { React, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modalsSlice';
import { useForm } from "react-hook-form";
import { addTask } from '../../store/tasksSlice';
import * as _ from 'lodash';
import { timeStart, notifTime } from '../../helpers';
import { useToastify } from '../../ToastifyContext';

export default function AddModal({ param }) {
    const dispatch = useDispatch();
    const { successToast, timeToast } = useToastify();

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
    useEffect(() => {
        setFocus('nameTask')
    }, []);

    const fn = (t)=>{
        const pi = t.slice(0,2);
        return pi<10 ? pi.slice(1,2) : pi;
    }
    const fnMin = (t) =>{
        const pi = t.slice(3,5);
        return pi<10 ? pi.slice(1,2) : pi;
    }
    
    const onSubmit = data => {
        const uniqID = param + data.nameTask+_.uniqueId();
        const newTask = { day: param, id: uniqID, done: false,  ...data };
        dispatch(addTask(newTask));
        dispatch(closeModal());
        successToast('Task added');
    };
     

    return (
        <>
            <Modal centered show onHide={() => dispatch(closeModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>New task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="nameTask">
                            <Form.Label> name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="task`s name"
                                isInvalid={errors.nameTask}
                                ref={0}
                                {...register("nameTask", { required: true, minLength: 3 , maxLength: 20 , })}
                            />
                               {errors.nameTask && errors.nameTask.type === "required" && <span className="errorValid">This field is required</span>}
                               {errors.nameTask && errors.nameTask.type === "minLength" && <span className="errorValid">This field must be greater than 3 characters</span>}
                               {errors.nameTask && errors.nameTask.type === "maxLength" && <span className="errorValid">This field must be less than 20 characters</span>}
                            
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="startTask">
                            <Form.Label>Task`s start</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="dateStart"
                                defaultValue={timeStart}
                                {...register("dateStart", { required: true })}
                            />
                            {errors.dateStart && (
                                <p className="errorValid">
                                    This field is required
                                </p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="startEnd">
                            <Form.Label>Task`s end</Form.Label>
                            <Form.Control
                                type="time"
                                defaultValue={'startTask'}
                                {...register("dateEnd", { required: false, })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="notification">
                            <Form.Label>Notification</Form.Label>
                            <Form.Select
                             name="notification"
                             defaultValue={notifTime[0]}
                             {...register("notification", { required: false, })}
                            >
                            {notifTime.map((el, i) => <option key={i} value={el}>{el}</option>)}
                         </Form.Select>
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

