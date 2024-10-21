import "./MovieBox.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface MovieBoxProps {
  moviename: string;
  genres: number[];
  image: string;
  description: string;
  date: string;
  rate: number;
  isLoading: boolean;
}

export default function MovieBox({
  moviename = "Movie Name",
  genres = [],
  image = "",
  rate = 0,
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
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
        <>
          <div className="movie-wrapper__image-box">
            {image ? (
              <img
                className="movie-wrapper__image"
                src={imageUrl}
                alt={moviename}
              />
            ) : (
              <div>
                <img
                  className="movie-wrapper__image"
                  src="src/assets/Default_Background_Art.jpg"
                />
                <p className="movie-wrapper__image--title">{moviename}</p>
              </div>
            )}
          </div>
          <div className="movie-wrapper__content movie-content">
            <div className="movie-content__title-wrapper">
              <h5 className="movie-content__header">{moviename}</h5>
              <div className="movie-content__rate">{rate.toFixed(1)}</div>
            </div>
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
