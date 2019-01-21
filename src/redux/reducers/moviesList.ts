import { SET_MOVIES_LIST, SetMoviesAction, MovieItem } from '../actions/moviesList';

export default function setMoviesList(state: MovieItem[] = [], action: SetMoviesAction): MovieItem[] {
  switch (action.type) {
    case SET_MOVIES_LIST:
      return [...action.data];
    default:
      return state;
  }
}
