import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export default class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e0e1eae6124a412984cc096bc1104592&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();


    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })

  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextOnClick = async () => {
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();

  }

  handlePrevOnClick = async () => {
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
  }




  render() {

    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {

            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>

          })}
          <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mb-3 my-3" onClick={this.handlePrevOnClick}> &laquo; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mb-3 my-3" onClick={this.handleNextOnClick}>Next  &raquo;</button>
          </div>
        </div>

      </div>
    )
  }
}
