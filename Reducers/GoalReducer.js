import { combineReducers } from 'redux';

const INITIAL_STATE = []

const GoalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_GOAL_DATA':
      return action.payload;
    default:
      return state;
}}

export default combineReducers({
  data: GoalReducer,
})

