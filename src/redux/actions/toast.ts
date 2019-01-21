export const SHOW_TOAST = 'SHOW_TOAST';
export type SHOW_TOAST = typeof SHOW_TOAST;
export const HIDE_TOAST = 'HIDE_TOAST';
export type HIDE_TOAST = typeof HIDE_TOAST;

export interface ShowToastAction {
  type: SHOW_TOAST;
  data?: string;
}

export interface HideToastAction {
  type: HIDE_TOAST;
}

export const showToast = (msg: string): ShowToastAction => ({
  type: SHOW_TOAST,
  data: msg,
});

export const hideToast = (): HideToastAction => ({
  type: HIDE_TOAST,
});
