import { createStore, combineReducers } from 'redux';
import { selectSong } from '../reducers';

const store = createStore(combineReducers({ selectSong }));

export default store;
