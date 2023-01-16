import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
             let {title,desc,imageUrl,newsUrl,author,date}=this.props;
    return (
      <div className='container my-3'>
        <div className="card" >
          <img src={!imageUrl?'https://www.reuters.com/resizer/9fb3BOiXT7RlsEkYqHAdrza4Q84=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/NLXTFHGOGZL4ZDUZLJU3PAPAEY.jpg':imageUrl} className="card-img-top" alt="Nothing to display here!" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="text-muted">By {!author?'Unknown':author} on {date}</small></p>
            <a href={newsUrl} rel="noreferrer"  target='_blank' className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )

  }
}

export default NewsItem
