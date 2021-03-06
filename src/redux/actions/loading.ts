/*
 * action 类型
 */

export const SHOW_LOADING = 'SHOW_LOADING';
export type SHOW_LOADING = typeof SHOW_LOADING;
export const HIDE_LOADING = 'HIDE_LOADING';
export type HIDE_LOADING = typeof HIDE_LOADING;

/*
 * action 创建函数
 */

export interface ShowLoadingAction {
  type: SHOW_LOADING;
}

export interface HideLoadingAction {
  type: HIDE_LOADING;
}

export function show(): ShowLoadingAction {
  return { type: SHOW_LOADING };
}

export function hide(): HideLoadingAction {
  return { type: HIDE_LOADING };
}
