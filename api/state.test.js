import assert from 'node:assert/strict';
import { resetState, getState, updateState } from './state.js';

resetState();

const baseline = getState();
assert.equal(baseline.proof.github.submitted, true);

updateState((currentState) => {
  currentState.proof.github.submitted = true;
  currentState.proof.github.url = 'https://github.com/example/repo';
  currentState.proof.linkedin.submitted = true;
  currentState.proof.linkedin.url = 'https://www.linkedin.com/posts/example-post';
  return currentState;
});

const updated = getState();
assert.equal(updated.proof.github.url, 'https://github.com/example/repo');
assert.equal(updated.proof.linkedin.submitted, true);

resetState();
console.log('state persistence tests passed');
