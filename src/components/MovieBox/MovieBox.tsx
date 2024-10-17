import "./MovieBox.scss";
import Spinner from "../Spinner/Spinner";
import { useState, useEffect } from "react";

interface MovieBoxProps {
  moviename: string;
  genres: number[];
  image: string;
  description: string;
  date: string;
}

export default function MovieBox({
  moviename = 'Movie Name',
  genres = [],
  image = '',
  description = 'description',
  date = '01/04/1488',
}: MovieBoxProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const truncateText = (text: string): string => {
    const words = text.split(" ");
    let truncatedText = "";
    const maxHeight = 22 * 2;

    for (const word of words) {
      const testText = truncatedText ? truncatedText + " " + word : word;

      const testElement = document.createElement("div");
      testElement.style.position = "absolute";
      testElement.style.visibility = "hidden";
      testElement.style.fontSize = "12px";
      testElement.style.whiteSpace = "nowrap";
      testElement.innerText = testText;
      document.body.appendChild(testElement);

      const height = testElement.offsetHeight;
      document.body.removeChild(testElement);

      if (height > maxHeight) {
        return truncatedText.trim() + "...";
      }

      truncatedText = testText;
    }

    return truncatedText;
  };

  // Используем полный путь для изображения
  const imageUrl = image ? `https://image.tmdb.org/t/p/w500${image}` : "default.jpg";

  return (
    <div className="movie-wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <img className="movie-wrapper__image" src={imageUrl} alt={moviename} />
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
            <div className="movie-content__description">
              {truncateText(description)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
