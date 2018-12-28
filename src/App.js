import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

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
      TODO: REMOVER A VERIFICACAO SE !== undefined QUANDO OS LIVROS VIEREM COM SUAS RESPECTIVAS PRATELEIRAS
    */
    if (oldShelfName !== undefined) {
      this.setState((currentState) => ({
        [oldShelfName]: currentState[oldShelfName].filter(b => b.id !== book.id)
      }))
    }
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
            <Search
              onChangeShelf={this.onChangeShelf}
             />
          )} />

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
