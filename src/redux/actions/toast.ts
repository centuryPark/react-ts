export const SHOW_TOAST = 'SHOW_TOAST';
export type showToastType = typeof SHOW_TOAST;
export const HIDE_TOAST = 'HIDE_TOAST';
export type hideToastType = typeof HIDE_TOAST;

export interface ShowToastAction {
  type: showToastType;
  data?: string;
}

export interface HideToastAction {
  type: hideToastType;
}

export const showToast = (msg: string): ShowToastAction => ({
  type: SHOW_TOAST,
  data: msg,
});

export const hideToast = (): HideToastAction => ({
  type: HIDE_TOAST,
});
