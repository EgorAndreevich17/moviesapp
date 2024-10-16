import MovieBox from "../MovieBox/MovieBox";
import "./Body.scss";

export default function Body() {
  return (
    <div className="body-wrapper">
      <div className="grid-container">
        <MovieBox></MovieBox>
        <MovieBox></MovieBox>
        <MovieBox></MovieBox>
        <MovieBox></MovieBox>
        <MovieBox></MovieBox>
      </div>
    </div>
  );
}
