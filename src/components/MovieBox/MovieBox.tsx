import "./MovieBox.scss";

export default function MovieBox() {
  return (
    <div className="movie-wrapper">
      <img className="movie-wrapper__image"></img>
      <div className="movie-wrapper__content movie-content">
        <h5 className="movie-content__header">The way back</h5>
        <p className="movie-content__date">March 5, 2020</p>
        <div className="movie-content__genres">
          <div className="movie-content__genres--1">Action</div>
          <div className="movie-content__genres--2">Drama</div>
        </div>
        <div className="movie-content__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quod
          laudantium aut pariatur fuga quisquam reprehenderit optio voluptas
          illum ut odit, itaque molestiae ullam inventore?
        </div>
      </div>
    </div>
  );
}
