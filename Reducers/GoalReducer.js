import { combineReducers } from 'redux';

const INITIAL_STATE = ['bob', 'sam']

const GoalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_GOAL_DATA':
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const newState = ['sally', 'jen']
      return newState;
    default:
      return state;
  }
  
};

export default combineReducers({
  goals: GoalReducer,
});