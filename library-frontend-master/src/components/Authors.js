import React, { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) }
    })
    setSelectedOption('')
    setBorn('')
  }

  const authors = props.result.data.allAuthors
  const options = authors.map(author => ({
    value: author.name,
    label: author.name
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedOption}
          onChange={(selectedOption) => setSelectedOption(selectedOption)}
          options={options}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit author</button>
      </form>
    </div>
  )
}

export default Authors