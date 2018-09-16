import React, {Component} from 'react';
import './index.scss';
import {Row, Tooltip, Button, Alert} from 'reactstrap';

const statuses = {
    'Draft': {
        'prev': undefined,
        'prevCode': undefined,
        'prevText': undefined,
        'prevConfirm': undefined,
        'prevHint': undefined,
        'next': 'Recruiting',
        'nextCode': 'RG',
        'nextText': 'Publish',
        'nextConfirm': 'Are you sure you want to open the game for recruitment?',
        'nextHint': 'Publishing your game will make it publicly visible in the game list and allow players to begin signing up to play. Make sure all of your details are ready before proceeding!',
    },
    'Recruiting': {
        'prev': 'Draft',
        'prevCode': 'DR',
        'prevText': 'Back to Draft',
        'prevConfirm': 'Are you sure you want to un-publish your game?',
        'prevHint': 'Reverting back to draft will make your game private again and delete any existing sign-ups.',
        'next': 'Pending',
        'nextCode': 'PD',
        'nextText': 'Close Registration',
        'nextConfirm': 'Are you sure you want to close registration?',
        'nextHint': 'Closing registration will prevent new sign-ups and open character creation for approved players.'
    },
    'Pending': {
        'prev': 'Recruiting',
        'prevCode': 'RG',
        'prevText': 'Re-open Registration',
        'prevConfirm': 'Are you sure you want to re-open registration?',
        'prevHint': 'Re-opening registration will allow players to sign up for the game again. Characters will not be deleted.',
        'next': 'Running',
        'nextCode': 'RN',
        'nextText': 'Start Game',
        'nextConfirm': 'Are you sure you want to start the game?',
        'nextHint': 'Starting the game will allow you to begin posting threads and prevent players from editing their characters. You can still modify them as the Game Master.'
    },
    'Running': {
        'prev': 'Pending',
        'prevCode': 'PD',
        'prevText': 'Undo Start',
        'prevConfirm': 'Are you sure you want to make the game pending again?',
        'prevHint': 'Reverting your game back to pending will delete any threads and comments and allow players to edit their characters again.',
        'next': 'Finished',
        'nextCode': 'FN',
        'nextText': 'End Game',
        'nextConfirm': 'Are you sure you want to end the game?',
        'nextHint': 'Ending the game will prevent players from posting in threads and sending private messages.'
    },
    'Finished': {
        'prev': 'Running',
        'prevCode': 'RN',
        'prevText': 'Re-activate Game',
        'prevConfirm': 'Are you sure you want to open the game for play again?',
        'prevHint': 'Re-activating the game will allow players to play the game again as though it hadn\'t ended.',
        'next': undefined,
        'nextCode': undefined,
        'nextText': undefined,
        'nextConfirm': undefined,
        'nextHint': undefined
    },
};

class StatusControls extends Component {
    constructor() {
        super();
        this.revertStatus = this.revertStatus.bind(this);
        this.advanceStatus = this.advanceStatus.bind(this);
        this.toggleRevert = this.toggleRevert.bind(this);
        this.toggleAdvance = this.toggleAdvance.bind(this);
        this.state = {
            revertButtonTooltipOpen: false,
            advanceButtonTooltipOpen: false
        };
    }

    toggleRevert() {
        this.setState({
            revertButtonTooltipOpen: !this.state.revertButtonTooltipOpen
        });
    }

    toggleAdvance() {
        this.setState({
            advanceButtonTooltipOpen: !this.state.advanceButtonTooltipOpen
        });
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
        const errors = this.props.errors || {};
        return <div className="gameHeader__status-controls">
            <Row>
                {
                    errors.non_field_errors ?
                        <Alert color="danger">{errors.non_field_errors}</Alert>
                        : ""
                }
            </Row>
            <Row>
                {
                    // Only show revert button if there is a 'prev' status defined
                    statuses[status].prev !== undefined ?
                        <div className="gameHeader__status-control-button">
                            <Button id="revertButton" onClick={this.revertStatus}
                                    color="secondary">{statuses[status].prevText}</Button>
                            <Tooltip placement="bottom" isOpen={this.state.revertButtonTooltipOpen}
                                     target="revertButton"
                                     toggle={this.toggleRevert}>
                                {statuses[status].prevHint}
                            </Tooltip>
                        </div> : ""
                }
                {
                    // Only show next button if there is a 'next' status defined
                    statuses[status].next !== undefined ?
                        <div className="gameHeader__status-control-button">
                            <Button id="advanceButton" onClick={this.advanceStatus}
                                    color="primary">{statuses[status].nextText}</Button>
                            <Tooltip placement="bottom" isOpen={this.state.advanceButtonTooltipOpen}
                                     target="advanceButton"
                                     toggle={this.toggleAdvance}>
                                {statuses[status].nextHint}
                            </Tooltip>
                        </div> : ""
                }
            </Row>
        </div>
    }
}

export default StatusControls;