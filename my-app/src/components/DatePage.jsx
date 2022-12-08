import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Row, ListGroup } from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom';
import AddModal from "./AddModal";
import { showModal } from "../store/modalsSlice";
import { getTasks } from "../store/tasksSlice";
import { daysArr, monthArr } from '../helpers'

export default function DatePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const paramData = params.id;
    const date = new Date(paramData);
    const { type } = useSelector((store) => store.modals);
    const taskArr = useSelector(getTasks);


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
                        { el.day===paramData && (<ListGroup.Item>                          
                            {el.taskName}
                            <Button>Edit</Button>
                            <Button>Delite</Button>                            
                        </ListGroup.Item>)}
                        </>)}
                    </ListGroup>
                </Card.Body>
            </Card>
            {type === 'adding' && <AddModal prop={date} param={paramData}/>}
        </>
    )
}