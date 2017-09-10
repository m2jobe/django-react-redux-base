import {
    DATA_RECEIVE_PROTECTED_DATA,
    DATA_FETCH_PROTECTED_DATA_REQUEST,
    VIDEO_DATA_RECEIVED,
    BANNER_DATA_RECEIVED,
    NOTIFICATION_REQUEST_SENT
} from '../constants';

const initialState = {
    data: null,
    isFetching: false,
    videos: null,
    banners: null,
    notificationRequestSent: false

};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_RECEIVE_PROTECTED_DATA:
            return Object.assign({}, state, {
                data: action.payload.data,
                isFetching: false
            });

        case DATA_FETCH_PROTECTED_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case VIDEO_DATA_RECEIVED:
            return Object.assign({}, state, {
                videos: action.payload.data,
                isFetching: false
            });
        case BANNER_DATA_RECEIVED:
            return Object.assign({}, state, {
                banners: action.payload.data,
                isFetching: false
            });
        case NOTIFICATION_REQUEST_SENT:
            return Object.assign({}, state, {
                notificationRequestSent: true,
                isFetching: false
            });
        default:
            return state;
    }
}
