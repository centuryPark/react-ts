import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import moment from 'moment';
import HttpClient from '../../tools/httpClient';

type JsonObject = { [key: string]: any };

export class MovieItem {
  static fromJson(json: JsonObject): MovieItem {
    return new MovieItem(
      json.id,
      json.coverUrl,
      json.desc,
      json.publishAt,
    );
  }
  constructor(
    readonly id: string,
    readonly coverUrl: string,
    readonly desc: string,
    readonly publishAt: string,
  ) {}
  get getParseTime(): string {
    return moment(this.publishAt).format('YYYY-MM-DD HH:mm:ss');
  }
}

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';
export type SET_MOVIES_LIST = typeof SET_MOVIES_LIST;

export interface SetMoviesAction {
  type: SET_MOVIES_LIST;
  data: MovieItem[];
}

const setMovies = (data: MovieItem[]): SetMoviesAction => ({
  type: SET_MOVIES_LIST,
  data,
});

export function getMoviesList(): ThunkAction<void, Object, null, Action<string>> {
  return (dispatch: Function) => {
    HttpClient.request(
      {
        method: 'get',
        url: 'api/live/now/streams?size=11&marker=',
        withCredentials: true,
      },
    ).then((data: JsonObject) => {
      const movies = data.result.map(MovieItem.fromJson);
      dispatch(setMovies(movies));
    });
  };
}
