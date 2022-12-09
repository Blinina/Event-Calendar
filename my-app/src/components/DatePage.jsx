import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, ListGroup, Form } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom';
import AddModal from "./modals/AddModal";
import { showModal } from "../store/modalsSlice";
import { getTasks, doneTask } from "../store/tasksSlice";
import { daysArr, monthArr, setFormatTime } from '../helpers'
import DeleteModal from "./modals/DeleteModal";
import EditModal from './modals/EditModal';
import { useToastify } from "../ToastifyContext";

export default function DatePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const { successToast } = useToastify();
    const navigate = useNavigate();
    const paramData = params.id;
    const date = new Date(paramData);
    const { type } = useSelector((store) => store.modals);
    const getTasksArr = useSelector(getTasks);
    const sortTasks = getTasksArr.sort((a, b) => a.dateStart.slice(0, 2) - b.dateStart.slice(0, 2));
    const handlerCheckbox = (el) => {
        dispatch(doneTask({ id: el.id, done: !el.done }));
        if (!el.done) {
            successToast('Task completed!');
        }
    };
    return (
        <>
            <Card className="date-card">
                <Card.Title>{daysArr[date.getDay()]},{monthArr[date.getMonth()].slice(0, 3)} {date.getDate()},{date.getFullYear()}</Card.Title>
                <hr />
                <div className="my-btn-group">
                    <Button onClick={() => navigate('/')}>Назад</Button>
                    <Button onClick={() => dispatch(showModal({ type: 'adding' }))}>+ New Task</Button>
                </div>
                <hr />
                <Card.Body>
                    <ListGroup>
                        {sortTasks.map((el) => <div key={el.id}>
                            {el.day === paramData && (<ListGroup.Item key={el.id} className={el.done ? 'done task' : 'task'}>
                                <div>
                                    <p className={el.done ? 'doneText taskName' : 'taskName'}>{el.nameTask}</p>
                                    <p className='time'>{setFormatTime(el.dateStart)}{el.dateEnd && ` - ${setFormatTime(el.dateEnd)}`}</p>
                                </div>
                                <div className='btns'>
                                    <Form>
                                        <Form.Check
                                            type='checkbox'
                                            id='default-checkbox'
                                            label='Done'
                                            checked={el.done}
                                            onChange={() => handlerCheckbox(el)}
                                        />
                                    </Form>
                                    <Button onClick={() => dispatch(showModal({ type: 'editing', itemId: el.id }))}>Edit</Button>
                                    <Button variant="danger" onClick={() => dispatch(showModal({ type: 'deleting', itemId: el.id }))}>Delite</Button>
                                </div>   </ListGroup.Item>)}
                        </div>)}
                    </ListGroup>
                </Card.Body>
            </Card>
            {type === 'adding' && <AddModal prop={date} param={paramData} />}
            {type === 'deleting' && <DeleteModal />}
            {type === 'editing' && <EditModal />}

        </>
    )
}