import React, { Component } from 'react';
import './App.css';
import Calendar from './Calendar'

class App extends Component {
  state = {
    data: [
      {
        "id": 1,
        "doctor": {
          "account_id": 7,
          "id": 1,
          "title": "Blue Walker"
        },
        "patient": {
          "id": 2,
          "salutation": "Mrs.",
          "firstname": "Anna",
          "lastname": "A.",
          "gender": 0,
          "notify_email": false,
          "notify_sms": false,
          "language": "de"
        },
        "start_time": "2015-11-11 09:00:00",
        "end_time": "2015-11-11 10:00:00",
        "start_hour": 0,
        "day_number": 1
      },
      {
        "id": 2,
        "doctor": {
          "account_id": 7,
          "id": 1,
          "title": "Blue Walker"
        },
        "patient": {
          "id": 2,
          "salutation": "Mrs.",
          "firstname": "Test",
          "lastname": "Bardzo wielki.",
          "gender": 0,
          "notify_email": false,
          "notify_sms": false,
          "language": "de"
        },
        "start_time": "2015-11-12 12:00:00",
        "end_time": "2015-11-12 13:00:00",
        "start_hour": 0,
        "day_number": 3
      }
    ]
  }

  updateData = (data) => {
    let radix = 10;

    // find dropped element
    let dropped = this.state.data.filter(d => d.id === parseInt(data.id, radix));
    if(dropped.length > 0) {
      // create new start_time
      let newTime = new Date(dropped[0].start_time);
      newTime.setHours(parseInt(data.data.target.hour, radix));
      newTime.setDate(data.data.target.day);

      // create new end_time
      let endTime = new Date(dropped[0].end_time);
      endTime.setHours(parseInt(data.data.target.hour, radix)+1);
      endTime.setDate(data.data.target.day);

      dropped[0].start_time = newTime.toISOString();
      dropped[0].end_time = endTime.toISOString();

      let newArr = this.state.data.filter(d => d.id !== parseInt(data.id, radix));
      newArr.push(...dropped);
      this.setState({data: newArr});
    }
  }

  render() {
    return (
      <div id="terminplaner">
        <Calendar updateData={this.updateData} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
