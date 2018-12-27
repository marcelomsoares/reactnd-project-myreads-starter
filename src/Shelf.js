import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {

  render() {
    const booksOnShelf = this.props.books
    const changeShelf = this.props.onChangeShelf

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelf.map((book) => (
              <li key={book.id}>
                <Book
                  thumbnail={book.imageLinks.thumbnail}
                  title={book.title} authors={book.authors}
                  shelfName={book.shelf}
                  changeShelf={(event) => changeShelf(book, event.target.value)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf