import { React, useState } from "react";
import { Table, Form, Badge, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import pen from "../img/e.png";
import { useDispatch, useSelector } from 'react-redux';
import { daysArr, monthArr, yearsArr, createCalendar, getDefaultStartDay, notificationArr, deleteElem } from '../helpers';
import { getTasks } from "../store/tasksSlice";
import YearCalendar from "./YearCalendar";
import { useToastify } from "../ToastifyContext";

export default function Main() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { timeToast } = useToastify();

    const [showYear, setShowYear] = useState(false);
    const toDayDay = new Date(Date.now());
    const today = `${toDayDay.getDate()}/${toDayDay.getMonth()}`;
    const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()).getMonth());
    const [currentYear, setCurrentYear] = useState(new Date(Date.now()).getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date(Date.now()).getDate());
    const allTasks = useSelector(getTasks);

    const handleYear = (e) => {
        setCurrentYear(e.target.value)
    }
    const handleMonth = (e) => {
        setCurrentMonth(monthArr.indexOf(e.target.value))
    }
    const hasTask = (el) => {
        const filter = allTasks.filter((it) => (getDefaultStartDay(el) === it.day) && (it.done === false));
        return filter.length !== 0
    }
    const handlePrevMonth = () => {
        console.log(currentMonth)
        if (currentMonth >= 1) {
            setCurrentMonth(currentMonth - 1)
        } else {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        }
    }
    const handleNextMonth = () => {
        console.log(currentMonth)
        if (currentMonth < 11) {
            setCurrentMonth(currentMonth + 1)
        } else {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        }
    }

    const calendar = createCalendar(currentYear, currentMonth);
    localStorage.setItem('root', 1);

    const getNotificationTM = () => {
        if (notificationArr.length === 0) {
        }
        notificationArr.forEach((el, i) => {
            const nowDate = Date.now();
            if (el.time < nowDate) {
                timeToast(`У вас назначена задача "${el.task}" на ${el.timeStart}`)
                deleteElem(i)
            }
        })
    }
    setInterval(getNotificationTM, 1000);

    return (<div>
        <Button onClick={() => setShowYear(!showYear)} variant="outline-primary">{showYear ? 'Month' : 'Year'}</Button>
        {showYear ? <YearCalendar year={currentYear} /> : <> <div className="header">
            <Button onClick={handlePrevMonth}>&lt;</Button>
            <Form.Select
                name="monthSelect"
                value={monthArr[currentMonth]}
                onChange={handleMonth}>
                {monthArr.map((el) => <option key={el} value={el}>{el}</option>)}
            </Form.Select>
            <Form.Select
                name="yearSelect"
                value={currentYear}
                onChange={(e) => handleYear(e)} >
                {yearsArr.map((el) => <option key={el} value={el}>{el}</option>)}
            </Form.Select>
            <Button onClick={handleNextMonth}>&gt;</Button>
        </div>
            <h2>  {monthArr[currentMonth]} {currentDay}, {currentYear} </h2>
            <Table striped bordered hover className="table" responsive>
                <thead >
                    <tr>
                        {daysArr.map((el) => <th key={el}>{el.slice(0, 2)}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, index) => (
                        <tr
                            key={index}>
                            {week.map((el, i) => el
                                ?
                                <td
                                    className={el.getDate() === currentDay ? 'selectTD' : 'white'}
                                    onClick={() => setCurrentDay(el.getDate())}
                                    key={i}>
                                    <>
                                        {`${el.getDate()}/${el.getMonth()}` === today
                                            ?
                                            <p className='today'>{el.getDate()}</p>
                                            :
                                            el.getDate()}
                                        {hasTask(el) &&
                                            <Badge bg="info"
                                                className="hasTask"
                                                onClick={() => navigate(`date/${getDefaultStartDay(el)}`)}>T
                                            </Badge>}
                                        <img src={pen}
                                            alt="edit"
                                            onClick={() => navigate(`date/${getDefaultStartDay(el)}`)}
                                        />
                                    </>
                                </td>
                                :
                                <td key={i}
                                />)}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>}
    </div>
    )
}
