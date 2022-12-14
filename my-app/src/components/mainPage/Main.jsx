import { React, useState } from "react";
import { Table, Form, Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import pen from "../../assets/images/editPen.png";
import { useSelector } from 'react-redux';
import { daysArr, monthArr, yearsArr, createCalendar, getDefaultStartDay, notificationArr, deleteElem, getAmountDays } from '../../helpers';
import { getTasks } from "../../store/tasksSlice";
import YearCalendar from "./YearCalendar";
import { useToastify } from "../../ToastifyContext";

export default function Main() {
    const navigate = useNavigate();
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
            setCurrentMonth(currentMonth - 1);
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
            const nowDate = Math.round(Date.now() / 1000);
            if (el.time < nowDate) {
                timeToast(`?? ?????? ?????????????????? ???????????? "${el.task}" ???? ${el.timeStart}`)
                deleteElem(i);
            }
        })
    };
    setInterval(getNotificationTM, 1000);

    const getLastDay = () => {
        const amountDays = getAmountDays(currentYear, currentMonth);
        if (currentDay > amountDays) {
            setCurrentDay(amountDays);
            return amountDays;
        } else {
            return currentDay;
        }
    };
    return (<div>
        <Button onClick={() => setShowYear(!showYear)} variant="outline-primary">{showYear ? 'Month' : 'Year'}</Button>
        {showYear
            ?
            <YearCalendar year={currentYear}
                setCurrentMonth={setCurrentMonth}
                setShowYear={setShowYear} />
            : <>
                <div className="header">
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
                <Card>
                    <Card.Title className="main-card-title"> {monthArr[currentMonth]} {getLastDay()}, {currentYear} </Card.Title>

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
                                            className={el.getDate() === currentDay ? 'select-TD month-td' : 'white month-td'}
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
                                                        className="has-task"
                                                        onClick={() => navigate(`date/${getDefaultStartDay(el)}`)}>T
                                                    </Badge>}
                                                <img src={pen}
                                                    alt="edit"
                                                    onClick={() => navigate(`date/${getDefaultStartDay(el)}`)}
                                                />
                                            </>
                                        </td>
                                        :
                                        <td key={i} />
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </>
        }
    </div>
    );
}
