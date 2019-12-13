import React from 'react'

const Recommendation = (props) => {
  if (!props.show) {
    return null
  }

  if (props.user.loading || props.books.loading) {
    return <div>loading...</div>
  }

  const user = props.user.data.me
  const books = props.books.data.allBooks

  const booksToShow = books.filter(b =>
    b.genres
      .map(g => g.toLowerCase())
      .includes(user.favoriteGenre.toLowerCase())
  )

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
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
    </div>
  )
}

export default Recommendation