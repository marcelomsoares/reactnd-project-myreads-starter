import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(
        (books) => {
          this.setState((currentState) => ({
            currentlyReading: books.filter(b => b.shelf === 'currentlyReading'),
            wantToRead: books.filter(b => b.shelf === 'wantToRead'),
            read: books.filter(b => b.shelf === 'read'),
          }))
        }
      )
  }

  onChangeShelf = (book, newShelfName) => {
    const oldShelfName = book.shelf
    BooksAPI.update(book, newShelfName)
    if (newShelfName !== 'none') {
      /*
        No caso da remoção de livros das estantes, não é necessário adicioná-lo em uma lista de nome 'none'.
        A aplicação nem salva os livros sem prateleira para poupar recursos e priorizar a performance.
      */
      this.setState((currentState) => ({
        [newShelfName]: currentState[newShelfName].concat(book),
      }))
    }
    /*
      Em todos os casos, deve-se remover o livro da prateleira antiga
    */
    this.setState((currentState) => ({
      [oldShelfName]: currentState[oldShelfName].filter(b => b.id !== book.id)
    }))
    /*
      Setando o atributo 'shelf' do livro, para que o select marque o valor correspondente à nova prateleira.
    */
    book.shelf = newShelfName
  }

  render() {
    return (
      <div className="app">
        <Route path='/search'
          render={() => (
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
                  <input type="text" placeholder="Search by title or author"/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">

                </ol>
              </div>
          </div>
          )}/>
        <Route exact path='/'
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf title='Currently Reading' books={this.state.currentlyReading} onChangeShelf={this.onChangeShelf} />
                  <Shelf title='Want to Read' books={this.state.wantToRead} onChangeShelf={this.onChangeShelf} />
                  <Shelf title='Read' books={this.state.read} onChangeShelf={this.onChangeShelf} />
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.props.history.push('/search')}>Add a book</button>
              </div>
            </div>
          )} />
      </div>
    )
  }
}

export default withRouter(BooksApp)
