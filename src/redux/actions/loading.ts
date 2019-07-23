/*
 * action 类型
 */

export const SHOW_LOADING = 'SHOW_LOADING';
export type showLoading = typeof SHOW_LOADING;
export const HIDE_LOADING = 'HIDE_LOADING';
export type hideLoading = typeof HIDE_LOADING;

/*
 * action 创建函数
 */

export interface ShowLoadingAction {
  type: showLoading;
}

export interface HideLoadingAction {
  type: hideLoading;
}

export function show(): ShowLoadingAction {
  return { type: SHOW_LOADING };
}

export function hide(): HideLoadingAction {
  return { type: HIDE_LOADING };
}
