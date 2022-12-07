import { React, useState } from "react";
import { Table, Form } from 'react-bootstrap';
import createCalendar from "../createCalendar";

export default function Main() {
    const [currentMonth, setCurrentMonth] = useState(new Date(Date.now()).getMonth());
    const [currentYear, setCurrentYear] = useState(new Date(Date.now()).getFullYear());
    const [currentDay, setCurrentDay] = useState(new Date(Date.now()).getDate());

console.log(new Date(Date.now()))
    // const nextMonth = new Date(year, month + 1);
    const daysArr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthArr = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const yearsArr = [2020, 2021, 2022, 2023, 2024];

    const calendar = createCalendar(currentYear, currentMonth);
 
   const handleDay  = (el) =>{
    console.log(el);
    setCurrentDay(el)

   }
   const handleYear = (e) =>{
   setCurrentYear(e.target.value)
   }
   const  handleMonth  = (e) => {
    setCurrentMonth(monthArr.indexOf(e.target.value))
    }

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
             onChange={(e) =>handleYear(e)} >
                {yearsArr.map((el) => <option key={el} value={el}>{el}</option>)}
            </Form.Select>
        </div>
        <h2> {currentDay} : {currentMonth+1} : {currentYear} </h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    {daysArr.map((el) => <th key={el}>{el}</th>)}
                </tr>
            </thead>
            <tbody>
                {calendar.map((week, index) => (
                    <tr key={index}>
                        {week.map((el, i) => el ? <td onClick={()=>handleDay(el.getDate())} key={i}>{el.getDate()}</td> : <td key={i} />)}
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
    )
}
