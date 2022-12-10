import { daysArr, monthArr, createCalendar, getDefaultStartDay } from '../../helpers';
import { Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



export default function YearCalendar({ year, setCurrentMonth, setShowYear }) {
    const navigate = useNavigate();
    const toDayDay = new Date(Date.now());
    const today = `${toDayDay.getDate()}/${toDayDay.getMonth()}`;
    const allMonth = monthArr.map((el, i) => createCalendar(year, i));
    const handleNavigate = (index) => {
        setCurrentMonth(index);
        setShowYear(false)
    };
    return (<>
        <h3>{year}</h3>
        <div className="yearCalendar">
            {allMonth.map((calendar, index) => <>
                <Table striped bordered hover responsive="sm" size='sm' className="table">
                    <caption onClick={() => handleNavigate(index)}>{monthArr[index]}, {year}</caption>
                    <thead >
                        <tr>
                            {daysArr.map((el) => <th key={el}>{el.slice(0, 2)}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {calendar.map((week, index) => (
                            <>
                                <tr
                                    key={index}>
                                    {week.map((el, i) => el
                                        ?
                                        <td
                                            onClick={() => navigate(`date/${getDefaultStartDay(el)}`)}
                                            className={`${el.getDate()}/${el.getMonth()}` === today ? 'selectTD yearSize' : 'white yearSize'}
                                            key={i}>
                                            <>
                                                {el.getDate()}
                                            </>
                                        </td>
                                        :
                                        <td key={i}
                                      />)}
                                </tr>
                            </>
                        ))
                        }
                    </tbody>
                </Table>
            </>)}
        </div>
    </>
    )
}