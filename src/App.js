import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import BooksMainPage from './BooksMainPage';
import BooksSearchPage from './BooksSearchPage';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  switchShelves = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
     BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
      })
   });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksMainPage
             books={this.state.books}
             switchShelves={this.switchShelves}
           />
        )}/>

        <Route path="/search" render={() => (
          <BooksSearchPage
            books={this.state.books}
            switchShelves={this.switchShelves}
          />
        )}/>
      </div>
    );
}
}

export default BooksApp;
