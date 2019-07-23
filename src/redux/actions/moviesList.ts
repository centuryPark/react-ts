import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import format from 'date-fns/format';
import HttpClient from '../../tools/httpClient';

interface JsonObject {
  [key: string]: any;
}

export class MovieItem {
  readonly id: string;

  readonly coverUrl: string;

  readonly desc: string;

  readonly publishAt: string;

  static fromJson(json: JsonObject): MovieItem {
    return new MovieItem(
      json.id,
      json.coverUrl,
      json.desc,
      json.publishAt,
    );
  }

  constructor(id: string, coverUrl: string, desc: string, publishAt: string) {
    this.id = id;
    this.coverUrl = coverUrl;
    this.desc = desc;
    this.publishAt = publishAt;
  }

  get getParseTime(): string {
    return format(new Date(this.publishAt), 'YYYY-MM-DD HH:mm:ss');
  }
}

export const SET_MOVIES_LIST = 'SET_MOVIES_LIST';
export type setMoviesList = typeof SET_MOVIES_LIST;

export interface SetMoviesAction {
  type: setMoviesList;
  data: MovieItem[];
}

const setMovies = (data: MovieItem[]): SetMoviesAction => ({
  type: SET_MOVIES_LIST,
  data,
});

export function getMoviesList(): ThunkAction<void, any, null, Action<string>> {
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
