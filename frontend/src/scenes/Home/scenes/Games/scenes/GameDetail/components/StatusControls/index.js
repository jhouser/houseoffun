import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Button} from 'reactstrap';

const statuses = {
    'DR': 'Draft',
    'RG': 'Recruiting',
    'PD': 'Pending',
    'RN': 'Running',
    'FN': 'Finished'
};

class StatusControls extends Component {
    render() {
        const status = this.props.status || statuses.DR;
        return <div className="gameHeader__status-controls">
            <Row>
                {
                    // Only show revert button if we're past the "Draft" status as we can't revert beyond that
                    status !== statuses.DR ?
                        <Col sm="6">
                            <Button color="secondary">Previous Status</Button>
                        </Col> : ""
                }
                <Col sm="6">
                    <Button color="primary">Next Status</Button>
                </Col>
            </Row>
        </div>
    }
}

export default StatusControls;