import React from 'react'
import Event from './Event'

class Calendar extends React.Component {

  onDragOver = (data) => (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const {day, hour, id} = data;
    this.props.updateData({data: {target: {'day': day, 'hour': hour}}, id });
  }

  renderEvents(hour) {
    const days = [1,2,3,4,5,6,7];

    let events = [];

    days.forEach((day) => {
      let data = this.props.data.find(data => (new Date(data.start_time).getDay()+1===day && new Date(data.start_time).getHours()===parseInt(hour, 10)));

      const event = data ? <Event data={data}/> : null;

      events.push(<td key={day} onDragOver={this.onDragOver({id: data ? data.id : null, hour, day})}>{event}</td>);
    });

    return (
      <tr key={hour}>
        <td className="hour">{hour}:00</td>
        {events}
      </tr>
    );
  }

  renderCalendar() {
    //this should come from server (fetch data), here hardcoded
    let workHours = [8,9,10,11,12,13,14,15,16,17,18,19,20];

    return(
      <table>
        <thead>
          <tr>
            <td>Czas</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
          </tr>
        </thead>
        <tbody>
          {workHours.map((hour) => this.renderEvents(hour))}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div>
        <div className="header">
          <h2>Terminplaner</h2>
          <div className="control">
            <span className="prev">&lt;</span>
            <span className="date">8-14</span>
            <span className="next">&gt;</span>
          </div>
          <span className="month"></span>
          <span className="slider"></span>
        </div>
        <div className="table">
          {this.renderCalendar()}
        </div>
      </div>
    )
  }
}

export default Calendar
