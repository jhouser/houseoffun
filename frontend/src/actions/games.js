import {RSAA} from 'redux-api-middleware';
import {withAuth} from "../util/api";
import axios from 'axios';
import {SubmissionError} from 'redux-form';

export const GAME_LIST_REQUEST = '@@games/GAME_LIST_REQUEST';
export const GAME_LIST_SUCCESS = '@@games/GAME_LIST_SUCCESS';
export const GAME_LIST_FAILURE = '@@games/GAME_LIST_FAILURE';

export const GAME_DETAIL_REQUEST = '@@games/GAME_DETAIL_REQUEST';
export const GAME_DETAIL_SUCCESS = '@@games/GAME_DETAIL_SUCCESS';
export const GAME_DETAIL_FAILURE = '@@games/GAME_DETAIL_FAILURE';

export const GAME_CREATE_REQUEST = '@@games/GAME_CREATE_REQUEST';
export const GAME_CREATE_SUCCESS = '@@games/GAME_CREATE_SUCCESS';
export const GAME_CREATE_FAILURE = '@@games/GAME_CREATE_FAILURE';

export const ADVANCE_STATUS_REQUEST = '@@games/ADVANCE_STATUS_REQUEST';
export const ADVANCE_STATUS_SUCCESS = '@@games/ADVANCE_STATUS_SUCCESS';
export const ADVANCE_STATUS_FAILURE = '@@games/ADVANCE_STATUS_FAILURE';

export const REVERT_STATUS_REQUEST = '@@games/REVERT_STATUS_REQUEST';
export const REVERT_STATUS_SUCCESS = '@@games/REVERT_STATUS_SUCCESS';
export const REVERT_STATUS_FAILURE = '@@games/REVERT_STATUS_FAILURE';


export const gameList = () => ({
  [RSAA]: {
      endpoint: process.env.REACT_APP_API_ENDPOINT + '/api/games/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GAME_LIST_REQUEST, GAME_LIST_SUCCESS, GAME_LIST_FAILURE
      ]
  }
});

export const gameDetail = (id) => ({
  [RSAA]: {
      endpoint: process.env.REACT_APP_API_ENDPOINT + '/api/games/' + id + '/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GAME_DETAIL_REQUEST, GAME_DETAIL_SUCCESS, GAME_DETAIL_FAILURE
      ]
  }
});

export const gameCreate = (data) => ({
  [RSAA]: {
      endpoint: process.env.REACT_APP_API_ENDPOINT + '/api/games/',
      method: 'POST',
      body: JSON.stringify(data),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GAME_CREATE_REQUEST,
        GAME_CREATE_SUCCESS,
        GAME_CREATE_FAILURE
      ]
  }
});

export const advanceStatus = (id, status) => {
    return (dispatch, getState) => {
        dispatch({type: ADVANCE_STATUS_REQUEST});
        return axios.post(
            process.env.REACT_APP_API_ENDPOINT + '/api/games/' + id + '/advance_status/',
            {status: status},
            {
                headers: withAuth({'Content-Type': 'application/json'})(getState())
            }
        ).then((res) => {
            dispatch({type: ADVANCE_STATUS_SUCCESS, payload: res.data});
        }).catch((error) => {
            dispatch({type: ADVANCE_STATUS_FAILURE, payload: error.response.data})
        });
    }
};

export const revertStatus = (id, status) => {
    return (dispatch, getState) => {
        dispatch({type: REVERT_STATUS_REQUEST});
        return axios.post(
            process.env.REACT_APP_API_ENDPOINT + '/api/games/' + id + '/revert_status/',
            {status: status},
            {
                headers: withAuth({'Content-Type': 'application/json'})(getState())
            }
        ).then((res) => {
            dispatch({type: REVERT_STATUS_SUCCESS, payload: res.data});
        }).catch((error) => {
            console.log(error);
        });
    }
};