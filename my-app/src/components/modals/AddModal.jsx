import { React, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { addTask } from '../../store/tasksSlice';
import * as _ from 'lodash';
import { timeStart, notifTimeKeys, notifTimeObj, notificationArr } from '../../helpers';
import { useToastify } from '../../ToastifyContext';

export default function AddModal({ param, setShowModal }) {
    const dispatch = useDispatch();
    const { successToast } = useToastify();

    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
    useEffect(() => {
        setFocus('nameTask')
    }, [setFocus]);

    const onSubmit = data => {
        const uniqID = param + _.uniqueId() + data.nameTask;
        const newTask = { day: param, id: uniqID, done: false, ...data };
        dispatch(addTask(newTask));
        setShowModal({ type: null });
        successToast('Task added');
        if (data.notification !== 'none') {
            const str = `${param}T${data.dateStart}:00`
            const notifTime = Date.parse(str) / 1000 - notifTimeObj[data.notification];
            notificationArr.push({ time: notifTime, task: data.nameTask, timeStart: data.dateStart })
        }
    };

    return (
        <Modal centered show onHide={() => setShowModal({ type: null })}>
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
                            {...register("nameTask", { required: true, minLength: 3, maxLength: 20, })}
                        />
                        {errors.nameTask && errors.nameTask.type === "required" && <span className="error-valid">This field is required</span>}
                        {errors.nameTask && errors.nameTask.type === "minLength" && <span className="error-valid">This field must be greater than 3 characters</span>}
                        {errors.nameTask && errors.nameTask.type === "maxLength" && <span className="error-valid">This field must be less than 20 characters</span>}

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
                            <p className="error-valid">
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
                            defaultValue={notifTimeKeys[0]}
                            {...register("notification", { required: false, })}
                        >
                            {notifTimeKeys.map((el, i) => <option key={i} value={el}>{el}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowModal({ type: null })} variant="secondary" >
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
