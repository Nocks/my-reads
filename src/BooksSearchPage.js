import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class BooksSearchPage extends Component {

  state = {
    searchQuery: '',
    searchedResults: [],
  }

  updateQuery = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery.trim()
    })
    this.updateResults(searchQuery);
  }

  updateResults = (searchQuery) => {
    if (searchQuery) {
      BooksAPI.search(searchQuery).then((searchedResults) => {
        // error handling
        searchedResults.error ? this.setState({ searchedResults: [] }) : this.setState({ searchedResults: searchedResults })
      })
    } else {
      this.setState({ searchedResults: [] });
    }
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchQuery}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searchedResults.map(searchedResult => {
                let shelfName = "none";

                this.props.books.map(book => (
                  book.id === searchedResult.id ?
                  shelfName = book.shelf :
                  ''
                ));

                return (
                <li key={searchedResult.id}>
                <Book
                  book={searchedResult}
                  switchShelves={this.props.switchShelves}
                  currentShelf={shelfName}
                />
                </li>
              );
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksSearchPage;
