import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Button} from 'reactstrap';

const statuses = {
    'Draft': {
        'prev': undefined,
        'prevCode': undefined,
        'prevText': undefined,
        'prevConfirm': undefined,
        'next': 'Recruiting',
        'nextCode': 'RG',
        'nextText': 'Publish',
        'nextConfirm': 'Are you sure you want to open the game for recruitment?'
    },
    'Recruiting': {
        'prev': 'Draft',
        'prevCode': 'DR',
        'prevText': 'Back to Draft',
        'prevConfirm': 'Are you sure you want to un-publish your game?',
        'next': 'Pending',
        'nextCode': 'PD',
        'nextText': 'Close Registration',
        'nextConfirm': 'Are you sure you want to close registration?'
    },
    'Pending': {
        'prev': 'Recruiting',
        'prevCode': 'RG',
        'prevText': 'Re-open Registration',
        'prevConfirm': 'Are you sure you want to re-open registration?',
        'next': 'Running',
        'nextCode': 'RN',
        'nextText': 'Start Game',
        'nextConfirm': 'Are you sure you want to start the game?'
    },
    'Running': {
        'prev': 'Pending',
        'prevCode': 'PD',
        'prevText': 'Undo Start',
        'prevConfirm': 'Are you sure you want to make the game pending again?',
        'next': 'Finished',
        'nextCode': 'FN',
        'nextText': 'End Game',
        'nextConfirm': 'Are you sure you want to end the game?'
    },
    'Finished': {
        'prev': 'Running',
        'prevCode': 'RN',
        'prevText': 'Re-activate Game',
        'prevConfirm': 'Are you sure you want to open the game for play again?',
        'next': undefined,
        'nextCode': undefined,
        'nextText': undefined,
        'nextConfirm': undefined
    },
};

class StatusControls extends Component {
    constructor() {
        super();
        this.revertStatus = this.revertStatus.bind(this);
        this.advanceStatus = this.advanceStatus.bind(this);
    }

    revertStatus() {
        if (window.confirm(statuses[this.props.status].prevConfirm)) {
            this.props.revertClick(this.props.id, statuses[this.props.status].prevCode)
        }
    }

    advanceStatus() {
        if (window.confirm(statuses[this.props.status].nextConfirm)) {
            this.props.advanceClick(this.props.id, statuses[this.props.status].nextCode)
        }
    }

    render() {
        const status = this.props.status || 'Draft';
        return <div className="gameHeader__status-controls">
            <Row>
                {
                    // Only show revert button if there is a 'prev' status defined
                    statuses[status].prev !== undefined ?
                        <div className="gameHeader__status-control-button">
                            <Button onClick={this.revertStatus} color="secondary">{statuses[status].prevText}</Button>
                        </div> : ""
                }
                {
                    // Only show next button if there is a 'next' status defined
                    statuses[status].next !== undefined ?
                        <div className="gameHeader__status-control-button">
                            <Button onClick={this.advanceStatus} color="primary">{statuses[status].nextText}</Button>
                        </div> : ""
                }
            </Row>
        </div>
    }
}

export default StatusControls;