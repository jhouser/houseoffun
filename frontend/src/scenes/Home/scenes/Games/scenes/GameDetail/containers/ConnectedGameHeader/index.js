import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {formApiAdapter} from "app/util/forms";
import GameHeader from "../../components/GameHeader";
import {isGameMaster, gameErrors} from "app/reducers/games";

const ConnectedGameHeader = (props) => {
    return (
        <GameHeader {...props}/>
    )
};
/* istanbul ignore next */
const mapStateToProps = state => ({
    isGameMaster: isGameMaster(state),
    errors: gameErrors(state)
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({

});
/* istanbul ignore next */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedGameHeader));
