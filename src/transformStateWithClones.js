'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(currentState, key.extraData);

      result.push({ ...currentState });
    } else if (key.type === 'removeProperties') {
      for (const removeKey of key.keysToRemove) {
        delete currentState[removeKey];
      }

      result.push({ ...currentState });
    } else if (key.type === 'clear') {
      for (const clearKey in currentState) {
        delete currentState[clearKey];
      }

      result.push({ ...currentState });
    } else {
      result.push({ ...currentState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
