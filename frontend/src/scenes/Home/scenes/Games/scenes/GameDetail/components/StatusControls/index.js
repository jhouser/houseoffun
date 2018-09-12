import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Button} from 'reactstrap';

const statuses = {
    'Draft': {
        'prev': undefined,
        'next': 'Recruiting',
        'nextCode': 'RG',
        'prevCode': undefined
    },
    'Recruiting': {
        'prev': 'Draft',
        'next': 'Pending',
        'nextCode': 'DR',
        'prevCode': 'PD'
    },
    'Pending': {
        'prev': 'Recruiting',
        'next': 'Running',
        'nextCode': 'RN',
        'prevCode': 'RG'
    },
    'Running': {
        'prev': 'Pending',
        'next': 'Finished',
        'nextCode': 'FN',
        'prevCode': 'PD'
    },
    'Finished': {
        'prev': 'Running',
        'next': 'Undefined',
        'nextCode': undefined,
        'prevCode': 'RN'
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
                            <Button onClick={() => this.props.advanceClick(this.props.id, statuses[this.props.status].nextCode)} color="primary">Advance to {statuses[status].next}</Button>
                        </Col> : ""
                }
            </Row>
        </div>
    }
}

export default StatusControls;