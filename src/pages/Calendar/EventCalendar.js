import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import axios from 'axios';
import "./EventCalendar.css";
// import './EventCalendar.css';

function EventCalendar(props) {
    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        props.setBackDrop(true);
        axios.get('https://anftracker.herokuapp.com/getLeaves')
            .then(res => {
                let leaveData = res.data.map(item => {
                    let color = item.leaveType === 'PL' ? '#6783ad' : item.leaveType === 'CL' ? '#91550b' : '#009933';
                    item.title = item.name + '(' + item.leaveType + ')';
                    item.start = item.startDate;
                    item.end = item.endDate;
                    item.editable = true;
                    item.backgroundColor = color;
                    return item;
                })
                setEventData(leaveData);
                props.setBackDrop(false);

            })
            .catch(err => {
                props.setBackDrop(false);
            })
    }, []);



    //   let eventsData = 
    //   [ { title: 'PrivilegeLeave', start: '2021-12-27T13:13:55.008', end: '2021-12-19T13:14:55.008',name:'Debarati Datta',textColor:'black'}, 
    //   { title: 'CasualLeave', start: '2021-12-17T13:13:55.008', end: '2021-12-19T13:13:55.008',name:'Farah',color:'Pink',textColor:'black'}, 
    //   { title: 'SickLeave', start: '2021-12-24T13:13:55.008', end: '2021-12-19T13:13:55.008',name:'Deepika',color:'Red',textColor:'black'}, 
    //  ]
    // [{
    //   url: 'https://anftracker.herokuapp.com/getLeaves', // use the `url` property
    //   color: 'yellow',   
    //   textColor: 'black'
    // }]
    return (
        <div className="event">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={eventData}
            />
        </div>

    )
}

export default EventCalendar
