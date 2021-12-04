import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import EditTask from '../Modals/EditTask';
import { Card, Badge } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
const Cards = ({ todoObj, index, deleteTask, updateTask }) => {
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(!show);
    }
    var bgcolor;
    var bgcolorpr;

    if (todoObj.status === "NOT_STARTED" || todoObj.status === "Not Started") {
        bgcolor = "secondary";
    }
    else if (todoObj.status === "STARTED" || todoObj.status === "Started") {
        bgcolor = "primary"
    }
    else if (todoObj.status === "Hold") {
        bgcolor = "dark"
    }
    else {
        bgcolor = "success"
    }
    if (todoObj.priority === "High") {
        bgcolorpr = "danger";
    }
    else if (todoObj.priority === "Medium") {
        bgcolorpr = "warning"
    }
    else {
        bgcolorpr = "success"
    }
    const handleDelete = () => {
        deleteTask(Number(todoObj.id));
    }

    const formatDate = (date) => {
        let now = moment(date);
        return now.format("Do MMMM YYYY") + " at " + now.format("HH:mm");
    }

    return (
        (todoObj) ?
            <div class="card-wrapper">
                <Row xs={1} md={1} className="g-4">
                    <Col md={4}>
                        <Card bg="light" className="card-style">
                            <Card.Body>
                                <Card.Title>{todoObj.task_name}</Card.Title>
                                <Card.Text>
                                    <b>Todo:</b> {todoObj.task_description}
                                </Card.Text>
                                <Card.Text style={{ paddingTop: "24px" }}>
                                    <b style={{ color: "red" }}>Deadline:</b> {formatDate(todoObj.endtime)}
                                </Card.Text>
                                <Card.Text style={{ paddingTop: "43px" }}>
                                    <Row>
                                        <Col>
                                            <b>Status</b>: <Badge bg={bgcolor} >{todoObj.status}</Badge>
                                        </Col>
                                        <Col>
                                            <b>Priority:</b>  <Badge pill bg={bgcolorpr}>{todoObj.priority}</Badge>
                                        </Col>
                                    </Row>
                                </Card.Text>
                                <Card.Text style={{ paddingTop: "22px", paddingLeft: "200px" }}>
                                    <div>
                                        <Row><Col xs={5}>
                                            <BiEditAlt size="26px" style={{ cursor: "pointer" }} onClick={() => { setShow(true) }} />
                                        </Col>
                                            <Col>
                                                <AiFillDelete size="26px" style={{ cursor: "pointer" }} onClick={handleDelete} />
                                            </Col>
                                            <EditTask toggle={toggle} show={show} todoObj={todoObj} updateTask={updateTask} />
                                        </Row>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            :
            <div>
            </div>
    );
};

export default Cards;