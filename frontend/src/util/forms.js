import {SubmissionError} from 'redux-form';

export function formApiAdapter(dispatch, actionCreator) {
    console.log(process.env.REACT_APP_API_ENDPOINT);
    return (...args) =>
        dispatch(actionCreator(...args)).then(response => {
            if (response.error) {
                throw new SubmissionError(formatErrors(response));
            }
            return response.payload;
        })
}

function formatErrors(response) {
    if (response.payload && response.payload.response) {
        return response.payload.response;
    }
    return response.error;
}