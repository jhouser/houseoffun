import React, {Component} from 'react';
import './index.scss';
import {Row, Col, Alert} from 'reactstrap';
import ConnectedStatusControls from "../../containers/ConnectedStatusControls";

class GameHeader extends Component {
    render() {
        const errors = this.props.errors || {};
        return <div className="gameHeader">
            <Row>
                {
                    errors.non_field_errors ?
                        <Alert color="danger">{errors.non_field_errors}</Alert>
                        : ""
                }
            </Row>
            <Row>
                <Col sm="12">
                    <h2>{this.props.name} ({this.props.abbreviation})</h2>
                </Col>
            </Row>

            <Row>
                <Col sm="12">
                    <div className="gameHeader__attribute gameHeader__game_master">
                        by {this.props.game_master ? this.props.game_master.username : ''}
                    </div>
                </Col>
            </Row>

            <Row>
                <Col sm="12" md="1">
                    <div
                        className={`gameHeader__attribute gameHeader__status gameHeader__status-${this.props.get_status_display}`}>
                        {this.props.get_status_display}
                    </div>
                </Col>
                {this.props.isGameMaster ?
                    <Col sm="12" md="3">
                        <ConnectedStatusControls id={this.props.id} status={this.props.get_status_display}/>
                    </Col> : ""
                }
            </Row>
        </div>
    }
}

export default GameHeader;