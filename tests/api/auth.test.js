import assert from 'node:assert/strict';
import { createUserState, getUserState } from '../../lib/state.js';

const first = createUserState({ id: 'user-123', email: 'demo@example.com', name: 'Demo User' });
assert.equal(first.user.id, 'user-123');
assert.equal(first.student.name, 'Demo User');

const second = getUserState({ id: 'user-123', email: 'demo@example.com', name: 'Demo User' });
assert.equal(second.user.email, 'demo@example.com');
console.log('auth state tests passed');
