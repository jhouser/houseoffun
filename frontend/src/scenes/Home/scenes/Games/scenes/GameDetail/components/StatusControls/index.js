import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Button} from 'reactstrap';

const statuses = {
    'Draft': {
        'prev': undefined,
        'prevCode': undefined,
        'prevText': undefined,
        'next': 'Recruiting',
        'nextCode': 'RG',
        'nextText': 'Publish'
    },
    'Recruiting': {
        'prev': 'Draft',
        'prevCode': 'DR',
        'prevText': 'Back to Draft',
        'next': 'Pending',
        'nextCode': 'PD',
        'nextText': 'Close Registration'
    },
    'Pending': {
        'prev': 'Recruiting',
        'prevCode': 'RG',
        'prevText': 'Re-open Registration',
        'next': 'Running',
        'nextCode': 'RN',
        'nextText': 'Start Game'
    },
    'Running': {
        'prev': 'Pending',
        'prevCode': 'PD',
        'prevText': 'Undo Start',
        'next': 'Finished',
        'nextCode': 'FN',
        'nextText': 'End Game'
    },
    'Finished': {
        'prev': 'Running',
        'prevCode': 'RN',
        'prevText': 'Re-activate Game',
        'next': undefined,
        'nextCode': undefined,
        'nextText': undefined
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
                            <Button color="secondary">{statuses[status].prevText}</Button>
                        </Col> : ""
                }
                {
                    // Only show next button if there is a 'next' status defined
                    statuses[status].next !== undefined ?
                        <Col sm="6">
                            <Button onClick={() => this.props.advanceClick(this.props.id, statuses[this.props.status].nextCode)} color="primary">{statuses[status].nextText}</Button>
                        </Col> : ""
                }
            </Row>
        </div>
    }
}

export default StatusControls;