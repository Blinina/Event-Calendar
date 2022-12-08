import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { closeModal } from '../../store/modalsSlice';
import { deleteTask, getTasks } from '../../store/tasksSlice';

export default function DeleteModal() {
    const dispatch = useDispatch();
    const { item } = useSelector((store) => store.modals);
    const allTasks = useSelector(getTasks);
    const currentTask = allTasks.find((it) => it.id === item);
    const handleDelete = () => {
        dispatch(deleteTask(currentTask));
        dispatch(closeModal());
    }
    return (
        <Modal show onHide={() => dispatch(closeModal())}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to delete this task?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(closeModal())}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}