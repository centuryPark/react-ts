import { INCREMENT, DECREMENT } from '../actions/counter';

export default function counter(state = 0, action: any) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
