import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

const CreateTask = ({ show, toggle, save }) => {
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [taskname, setTaskname] = useState("");
  const [taskdescription, setTaskdescription] = useState("")
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const handleDateChange = (date) => {
    console.log(date);
    setEndDateTime(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "taskname") {
      setTaskname(value);
    }
    else if (name === "taskdescription") {
      setTaskdescription(value);
    }
    else if (name === "status") {
      setStatus(value);
    }
    else if (name === "priority") {
      setPriority(value);
    }
  }

  const handleSubmit = (event) => {

    let tasklistobj = {};
    tasklistobj['task_name'] = taskname;
    tasklistobj['task_description'] = taskdescription;
    tasklistobj['status'] = status;
    tasklistobj['priority'] = priority;
    tasklistobj['endtime'] = endDateTime;
    save(tasklistobj);
    setTaskname("");
    setTaskdescription("");
    setStatus("");
    setPriority("");
    setEndDateTime(new Date());

  }
  return (
    <Modal show={show} onHide={toggle} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create A New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Task Name</label>
          <input type="text" className="form-control" value={taskname} onChange={handleChange} name="taskname" />
        </div>
        <div className="form-group">
          <label>Task Description</label>
          <textarea rows="4" type="text" value={taskdescription} className="form-control" onChange={handleChange} name="taskdescription" />
        </div>
        <div className="form-group">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={handleChange} name="status">
                <option>Select Status</option>
                <option>Not Started</option>
                <option>Started</option>
                <option>Hold</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Priority</Form.Label>
              <Form.Select value={priority} name="priority" defaultValue="Choose..." onChange={handleChange} >
                <option>Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>

          </Row>
          <Row className="mb-1">
            <Form.Group>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDateTimePicker
                  id="time-picker"
                  label="End Time"
                  value={endDateTime}
                  onChange={handleDateChange} />
              </MuiPickersUtilsProvider>
            </Form.Group>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTask;