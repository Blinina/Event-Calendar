import { React, useState, useEffect } from "react";
import { Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import pen from "../img/editPen.png";
import { daysArr, monthArr, yearsArr, createCalendar, getDefaultStartDay } from '../helpers';

export default function Main() {
    const navigate = useNavigate();
    const toDay = new Date(Date.now()).getDate();
    const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()).getMonth());
    const [currentYear, setCurrentYear] = useState(new Date(Date.now()).getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date(Date.now()).getDate());

    const handleDay = (el) => {
        setCurrentDay(el);
    }
    const handleYear = (e) => {
        setCurrentYear(e.target.value)
    }
    const handleMonth = (e) => {
        setCurrentMonth(monthArr.indexOf(e.target.value))
    }

    const calendar = createCalendar(currentYear, currentMonth)
    localStorage.setItem('root', 1);
    return (<div>
        <div className="header">
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
        </div>
        <h2>  {monthArr[currentMonth]} {currentDay}, {currentYear} </h2>
        <Table striped bordered hover className="table">
            <thead >
                <tr>
                    {daysArr.map((el) => <th key={el}>{el.slice(0, 2)}</th>)}
                </tr>
            </thead>
            <tbody>
                {calendar.map((week, index) => (
                    <tr key={index}>
                        {week.map((el, i) => el
                            ?
                            <td
                                className={el.getDate() === currentDay ? 'selectTD' : 'white'}
                                onClick={() => handleDay(el.getDate())}
                                key={i}>
                                <>
                                    {toDay === el.getDate() ? <p className='today'>{el.getDate()}</p> : el.getDate()}
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

    </div>
    )
}
