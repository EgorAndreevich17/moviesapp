import "./MovieBox.scss";
import Spinner from "../Spinner/Spinner";

interface MovieBoxProps {
  moviename: string;
  genres: number[];
  image: string;
  description: string;
  date: string;
  isLoading: boolean;
}

export default function MovieBox({
  moviename = "Movie Name",
  genres = [],
  image = "",
  description = "description",
  date = "01/04/1488",
  isLoading,
}: MovieBoxProps) {
  const imageUrl = image
    ? `https://image.tmdb.org/t/p/w500${image}`
    : "default.jpg";

  return (
    <div className="movie-wrapper">
      {isLoading ? (
        <div className="spinner-box">
          <Spinner />
        </div>
      ) : (
        <>
          <div className='movie-wrapper__image-box'>
            {image ? (
              <img
                className="movie-wrapper__image"
                src={imageUrl}
                alt={moviename}
              />
            ) : (
              <div className="image-spinner-box">
                <Spinner />
              </div>
            )}
          </div>
          <div className="movie-wrapper__content movie-content">
            <h5 className="movie-content__header">{moviename}</h5>
            <p className="movie-content__date">{date}</p>
            <div className="movie-content__genres">
              {genres.map((genre, index) => (
                <div
                  key={index}
                  className={`movie-content__genres--${index + 1}`}
                >
                  {genre}
                </div>
              ))}
            </div>
            <div className="movie-content__description">{description}</div>
          </div>
        </>
      )}
    </div>
  );
}
