import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Button} from 'reactstrap';

const statuses = {
    'Draft': {
        'prev': undefined,
        'next': 'Recruiting'
    },
    'Recruiting': {
        'prev': 'Draft',
        'next': 'Pending'
    },
    'Pending': {
        'prev': 'Recruiting',
        'next': 'Running'
    },
    'Running': {
        'prev': 'Pending',
        'next': 'Finished'
    },
    'Finished': {
        'prev': 'Running',
        'next': 'Undefined'
    },
};

class StatusControls extends Component {
    render() {
        const status = this.props.status || 'Draft';
        return <div className="gameHeader__status-controls">
            <Row>
                {
                    // Only show revert button if there is a 'prev' status defined
                    statuses[status].prev !== undefined ?
                        <Col sm="6">
                            <Button color="secondary">Revert to {statuses[status].prev}</Button>
                        </Col> : ""
                }
                {
                    // Only show next button if there is a 'next' status defined
                    statuses[status].next !== undefined ?
                        <Col sm="6">
                            <Button color="primary">Advance to {statuses[status].next}</Button>
                        </Col> : ""
                }
            </Row>
        </div>
    }
}

export default StatusControls;