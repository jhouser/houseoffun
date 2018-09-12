import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {formApiAdapter} from "app/util/forms";
import StatusControls from "../../components/StatusControls";
import {advanceStatus} from "../../../../../../../../actions/games";

const ConnectedStatusControls = (props) => {
    return (
        <StatusControls {...props}/>
    )
};
/* istanbul ignore next */
const mapStateToProps = state => ({

});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
    advanceClick: formApiAdapter(dispatch, advanceStatus)
});
/* istanbul ignore next */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedStatusControls));
