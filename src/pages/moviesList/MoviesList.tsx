import React, { Component, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { getMoviesList, MovieItem } from '../../redux/actions/moviesList';

interface MoviesListProps {
  list: Array<MovieItem>;
  getMoviesList: Function;
}

interface MoviesItemProps {
  item: MovieItem;
}

const Item: FunctionComponent<MoviesItemProps> = (props) => {
  const { item } = props;
  return (
    <div className="live-item">
      <div className="banner">
        <img src={item.coverUrl} alt="banner"/>
      </div>
      <div className="desc">
        {item.desc}
      </div>
      <p>{item.getParseTime}</p>
    </div>
  );
};

class MoviesList extends Component<MoviesListProps> {
  componentDidMount() {
    this.fetchList();
  }

  buildList = (): JSX.Element[] => {
    const { list } = this.props;
    return list.map((item: MovieItem) => {
      return (
        <Item key={item.id} item={item}/>
      );
    });
  }

  fetchList = () => {
    this.props.getMoviesList();
  }

  render() {
    const movieList = this.buildList();
    return (
      <div className="page-movie-list">
        <h3>跨域代理请求测试，数据采用造就直播列表。（如有侵权请联系删除）</h3>
        <div className="live-list">
          {movieList}
        </div>
        <button type="button" onClick={this.fetchList}>再来一次</button>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { moviesList } = state;
  return {
    list: moviesList,
  };
}

/* function mapDispatchToProps(dispatch) {
  return {
    getMoviesList() {
      dispatch(getMoviesList())
    },

  }
} */

export default connect(mapStateToProps, { getMoviesList })(MoviesList);
