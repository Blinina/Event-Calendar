import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, ListGroup, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, doneTask } from "../../store/tasksSlice";
import { daysArr, monthArr, setFormatTime, notificationArr, deleteElem } from "../../helpers";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import AddModal from "../modals/AddModal";
import { useToastify } from "../../ToastifyContext";

export default function DatePage() {
    const dispatch = useDispatch();
    const params = useParams();
    const [showModal, setShowModal] = useState({ type: null, itemId: null });


    const { successToast, timeToast } = useToastify();
    const navigate = useNavigate();
    const paramData = params.id;
    const date = new Date(paramData);
    const getTasksArr = useSelector(getTasks);
    const sortTasks = getTasksArr.sort((a, b) => a.dateStart.slice(0, 2) - b.dateStart.slice(0, 2));
    const handlerCheckbox = (el) => {
        dispatch(doneTask({ id: el.id, done: !el.done }));
        if (!el.done) {
            successToast("Task completed!");
        }
    };

    const getNotificationTMDate = () => {
        notificationArr.forEach((el, i) => {
            const nowDate = Math.round(Date.now() / 1000);
            if (nowDate > el.time) {
                timeToast(`You have the task  "${el.task}" at ${el.timeStart}`);
                deleteElem(i);
            }
        });
    };
    setInterval(getNotificationTMDate, 1000);

    return (
        <Card className="date-card">
            <Card.Title className="main-card-title">{daysArr[date.getDay()]}, {monthArr[date.getMonth()].slice(0, 3)} {date.getDate()}, {date.getFullYear()}</Card.Title>
            <Card.Body>
                <div className="my-btn-group">
                    <Button onClick={() => navigate("/")}>Back</Button>
                    <Button onClick={() => setShowModal({ type: "adding" })}>+ New Task</Button>
                </div>
                <hr />
                <ListGroup>
                    {sortTasks.map((el) => <div key={el.id}>
                        {el.day === paramData && (<ListGroup.Item key={el.id} className={el.done ? "done task" : "task"}>
                            <div>
                                <p className={el.done ? "done-text taskName" : "task-name"}>{el.nameTask}</p>
                                <p className="time">{setFormatTime(el.dateStart)}{el.dateEnd && ` - ${setFormatTime(el.dateEnd)}`}</p>
                            </div>
                            <div className='btns'>
                                <Form>
                                    <Form.Check
                                        type="checkbox"
                                        id="default-checkbox"
                                        label="Done"
                                        checked={el.done}
                                        onChange={() => handlerCheckbox(el)}
                                    />
                                </Form>
                                <Button className="edit" onClick={() => setShowModal({ type: "editing", itemId: el.id })}>&#9998;</Button>
                                <Button variant="danger" className="danger" onClick={() => setShowModal({ type: "deleting", itemId: el.id })}>&#10008;</Button>
                                {showModal.type === "adding" && <AddModal param={paramData} setShowModal={setShowModal} />}
                                {showModal.type === "deleting" && <DeleteModal setShowModal={setShowModal} showModal={showModal} />}
                                {showModal.type === "editing" && <EditModal param={paramData} setShowModal={setShowModal} showModal={showModal} />}
                            </div>
                        </ListGroup.Item>
                        )}
                    </div>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}