import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  state = {
    shelfName: ''
  }

  componentDidMount() {
    if (this.props.shelfName !== undefined) {
      this.setState(currentState => ({
        shelfName: this.props.shelfName
      }))
    } else {
      // com esse trecho, funciona, porém exibe um alerta no console
      // BooksAPI.get(this.props.bookId)
      // .then((b) => {
      //   this.setState(currentState => ({
      //     shelfName: b.shelf
      //   }))
      // })
    }
  }

  changeShelf = (event) => {
    this.setState((currentState) => ({
      shelfName: event.target.value
    }))
  }

  // alternativa para só buscar a estante quando clicar no select do livro
  // só seta quando se abre o select a segunda vez
  getShelfInfo = (event) => {
    console.log('buscando dados do livro pela API...')
    BooksAPI.get(this.props.bookId)
      .then((b) => {
        console.log(`...o livro se encontra na prateleira '${b.shelf}'`)
        this.setState(currentState => ({
          shelfName: b.shelf
        }))
        this.forceUpdate()
      })
  }

  render() {
    const onChangeShelf = this.props.changeShelf

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelfName} onChange={onChangeShelf}
              onClick={(event) => this.getShelfInfo(event)}
            >
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    )
  }
}

export default Book