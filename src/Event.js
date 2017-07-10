import React from 'react'
import PropTypes from 'prop-types'

class Event extends React.Component {
  onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
  }

  render() {
    const event = this.props.data;
    const startDate = new Date(event.start_time);
    const endDate = new Date(event.end_time);

    return (
      <div className="day">
        <div draggable="true" onDragStart={this.onDragStart}>
          <div className="event q4 past">
            <p className="hours"> {
              startDate.getHours()}:{startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()
              }
            </p>
            <p className="description">{event.patient.firstname} {event.patient.lastname}</p>
            <span className="icon"></span>
          </div>
        </div>
      </div>
    )
  }
}

Event.propTypes = {
  data: PropTypes.object.isRequired
}

export default Event
