import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Shelf extends Component {

  onChangeShelfListener = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
  }

  render() {
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map((book) => (
                <li key={book.id}>
                  <Book
                    thumbnail={book.imageLinks.thumbnail}
                    title={book.title} authors={book.authors}
                    shelf={book.shelf}
                    changeShelf={(event) => this.onChangeShelfListener(book, event.target.value)}
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