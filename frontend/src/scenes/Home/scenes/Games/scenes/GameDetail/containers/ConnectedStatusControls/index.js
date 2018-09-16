import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {formApiAdapter} from "app/util/forms";
import StatusControls from "../../components/StatusControls";
import {advanceStatus, revertStatus} from "app/actions/games";
import {gameErrors} from "app/reducers/games";

const ConnectedStatusControls = (props) => {
    return (
        <StatusControls {...props}/>
    )
};
/* istanbul ignore next */
const mapStateToProps = state => ({
    errors: gameErrors(state)
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
    advanceClick: formApiAdapter(dispatch, advanceStatus),
    revertClick: formApiAdapter(dispatch, revertStatus)
});
/* istanbul ignore next */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedStatusControls));
