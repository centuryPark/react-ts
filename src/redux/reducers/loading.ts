import {
  SHOW_LOADING,
  HIDE_LOADING,
  ShowLoadingAction,
  HideLoadingAction,
} from '../actions/loading';

export default function loading(state = false, action: (ShowLoadingAction | HideLoadingAction)): boolean {
  switch (action.type) {
    case SHOW_LOADING:
      return true;
    case HIDE_LOADING:
      return false;
    default:
      return state;
  }
}
