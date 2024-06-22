import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, publishedAt, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={!imageUrl?"https://www.millenniumpost.in/h-upload/2024/06/12/788964-iit-madras.jpg":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toUTCString()}</small></p>
            <div className="d-flex justify-content-between">
              <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
              <span className="badge text-bg-danger">{source}</span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
