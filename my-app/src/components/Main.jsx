import { React, useState, useEffect } from "react";
import { Table, Form, Button } from 'react-bootstrap';
import createCalendar from "../createCalendar";
import { useNavigate } from "react-router-dom";
import pen from "../img/editPen.png";

export default function Main() {
    const navigate = useNavigate();
    // const [yearCalendar, setYearCalendar] = useState(false);
    // const [monthCalendar, setMonthCalendar] = useState(true);

    const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()).getMonth());
    const [currentYear, setCurrentYear] = useState(new Date(Date.now()).getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date(Date.now()).getDate());

    // const nextMonth = new Date(year, month + 1);
    const daysArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthArr = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const yearsArr = [2020, 2021, 2022, 2023, 2024];

    const handleDay = (el) => {
        setCurrentDay(el);
    }
    const handleYear = (e) => {
        setCurrentYear(e.target.value)
    }
    const handleMonth = (e) => {
        setCurrentMonth(monthArr.indexOf(e.target.value))
    }
    // const handleDefault = () => {      
    // }
    // const handleYear = () => {

    // };
    const calendar = createCalendar(currentYear, currentMonth)

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
            {/* <Button onClick={handlePrevious}>Month</Button>
            <Button onClick={handleNext}>Year</Button> */}
        </div>
        <h2> {currentDay} : {monthArr[currentMonth]} : {currentYear} </h2>
        <Table striped bordered hover className="table">
            <thead >
                <tr>
                    {daysArr.map((el) => <th key={el}>{el}</th>)}
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
                                    {el.getDate()}
                                    <img src={pen}
                                        alt="edit"
                                        onClick={() => navigate(`date/${el.getFullYear()}-${el.getMonth()}-${el.getDate()}`)}
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
