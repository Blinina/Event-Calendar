// import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, ListGroup } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom';
import AddModal from "./modals/AddModal";
import { showModal } from "../store/modalsSlice";
import { getTasks } from "../store/tasksSlice";
import { daysArr, monthArr } from '../helpers'
import DeleteModal from "./modals/DeleteModal";
import EditModal from './modals/EditModal';

export default function DatePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const paramData = params.id;
    const date = new Date(paramData);
    const { type } = useSelector((store) => store.modals);
    const taskArr = useSelector(getTasks);
console.log(taskArr)
    return (
        <>
            <Card className="date-card">
                <Card.Title>{daysArr[date.getDay()]},{monthArr[date.getMonth()].slice(0, 3)} {date.getDate()},{date.getFullYear()}</Card.Title>
                <hr />
                <div className="byn-group">
                    <Button onClick={() => navigate('/')}>Назад</Button>
                    <Button onClick={() => dispatch(showModal({ type: 'adding' }))}>+ New Task</Button>
                </div>
                <hr />
                <Card.Body>
                    <ListGroup>
                        {taskArr.map((el) => <>
                        {el.day===paramData && (<ListGroup.Item key={el.id}>                          
                            {el.taskName}
                            <Button onClick={() => dispatch(showModal({ type: 'editing', itemId: el.id}))}>Edit</Button>
                            <Button variant="danger" onClick={() => dispatch(showModal({ type: 'deleting', itemId: el.id }))}>Delite</Button>
                        </ListGroup.Item>)}
                        </>)}
                    </ListGroup>
                </Card.Body>
            </Card>
            {type === 'adding' && <AddModal prop={date} param={paramData}/>}
            {type === 'deleting' && <DeleteModal/>}                            
            {type === 'editing' && <EditModal/>}                            

        </>
    )
}