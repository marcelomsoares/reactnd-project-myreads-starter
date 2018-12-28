import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class Search extends Component {

  state = {
    searchResults: []
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then((b) => {
        if (Array.isArray(b)) {
          // caso haja resultados para a busca, a resposta vem em formato de Array
          this.setState((currentState) => ({
            searchResults: b
          }))
        } else {
          // caso a resposta seja o objeto com a mensagem de que a busca não recebeu resultados
          this.setState((currentState) => ({
            searchResults: []
          }))
        }
      })
  }

  render() {
    const changeShelf = this.props.onChangeShelf

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" name='searchTerm' placeholder="Search by title or author"
              onChange={(event) => this.searchBooks(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.searchResults.map((book) => (
            <li key={book.id}>
              <Book
                thumbnail={book.imageLinks !== undefined ? book.imageLinks.thumbnail : ''}
                title={book.title} authors={book.authors}
                bookId={book.id}
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

export default withRouter(Search)