import React, { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks
  const allGenres = books.reduce((acc, val) => acc.concat(val.genres), [])
  // Uniqueue genres
  const genres = [...new Set(allGenres), 'all genres'].map(g => g.toLowerCase())
  const booksToShow = selectedGenre === 'all genres'
    ? books
    : books.filter(b =>
        b.genres.map(g => g.toLowerCase()).includes(selectedGenre)
      )
  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{selectedGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => (
        <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
      ))}
    </div>
  );
}

export default Books