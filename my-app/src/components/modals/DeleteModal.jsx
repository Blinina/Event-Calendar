import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { deleteTask, getTasks } from '../../store/tasksSlice';
import { useToastify } from '../../ToastifyContext';

export default function DeleteModal({ setShowModal, showModal }) {
    const dispatch = useDispatch();
    const { successToast } = useToastify();
    const { itemId } = showModal;
    const allTasks = useSelector(getTasks);
    const currentTask = allTasks.find((it) => it.id === itemId);

    const handleDelete = () => {
        successToast('Task removed');
        dispatch(deleteTask(currentTask));
        setShowModal({ type: null, itemId: null });
    };

    return (
        <Modal show onHide={() => setShowModal({ type: null, itemId: null })}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to delete this task?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal({ type: null, itemId: null })}>
                    Close
                </Button>
                <Button variant="danger" className="danger-delite" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}