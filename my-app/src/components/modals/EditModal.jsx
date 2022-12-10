import { React } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { closeModal } from '../../store/modalsSlice';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { renameTask, getTasks } from '../../store/tasksSlice';
import { notifTimeKeys, notificationArr, notifTimeObj } from '../../helpers';
import { useToastify } from '../../ToastifyContext';

export default function EditModal({ param }) {
    const dispatch = useDispatch();
    const { successToast } = useToastify();
    const { register, handleSubmit } = useForm();
    const { item } = useSelector((store) => store.modals);
    const allTasks = useSelector(getTasks);
    const currentTask = allTasks.find((it) => it.id === item);
    console.log(currentTask);

    const onSubmit = data => {
        console.log('kek')
        const { id } = currentTask;
        dispatch(renameTask({ id, ...data }));
        dispatch(closeModal());
        successToast('Task changed');
        if (data.notification !== 'none') {
            const str = `${param}T${data.dateStart}:00`
            const notifTime = Date.parse(str) / 1000 - notifTimeObj[data.notification];
            notificationArr.push({ time: notifTime, task: data.nameTask, timeStart: data.dateStart })
        }
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
                                defaultValue={currentTask.nameTask}
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

