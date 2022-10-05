import PropTypes from 'prop-types'

import '../assets/styles.css'

export default function ListMovies ({ movies, addMovieToCard }) {
  return (
      <div className="movies__list">
        <ul>
          {movies.map((o, i) => (
            <li key={`movie-${i}`} className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addMovieToCard(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
  )
}

ListMovies.propTypes = {
  movies: PropTypes.array,
  addMovieToCard: PropTypes.func
}
