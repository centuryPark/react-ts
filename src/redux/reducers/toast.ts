import { SHOW_TOAST, HIDE_TOAST, ShowToastAction, HideToastAction } from '../actions/toast';

interface InitState {
  visible: boolean;
  msg?: string;
}

export default function setToast(
  state: InitState = { visible: false, msg: '' },
  action: (ShowToastAction | HideToastAction),
): InitState {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        visible: true,
        msg: action.data,
      };
    case HIDE_TOAST:
      return {
        visible: false,
        msg: '',
      };
    default:
      return state;
  }
}
