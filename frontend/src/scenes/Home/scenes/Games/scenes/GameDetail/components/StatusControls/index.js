import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Button} from 'reactstrap';

class StatusControls extends Component {
    render() {
        return <div className="gameHeader__status-controls">
            <Row>
                <Col sm="6">
                    <Button color="secondary">Previous Status</Button>
                </Col>
                <Col sm="6">
                    <Button color="primary">Next Status</Button>
                </Col>
            </Row>
        </div>
    }
}

export default StatusControls;