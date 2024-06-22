import React, { useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  //document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const updateNews = async () => {
  props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  //this.setState({ loading: true });
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  //console.log(parsedData);
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  // this.setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false
  // })
  props.setProgress(100);
}

useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  updateNews();
}, [])

  const fetchMoreData = async () => {
    //this.setState({page: this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    //this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
  };

    return (
      <>
        <h1 className="text-center" style={{margin: '33px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
            {articles.map((article) => {
              return <div className="col-md-4" key={article.url}>
                      <NewsItem title={article.title?article.title.slice(0,45):""} 
                      description={article.description?article.description.slice(0,88):""} 
                      imageUrl={article.urlToImage} newsUrl={article.url} 
                      author={!article.author?"Unknown":article.author} publishedAt={article.publishedAt} 
                      source={article.source.name}/>
                    </div>
            })}
            </div>

          </div>

        </InfiniteScroll>
        
      </>
    )
}

News.defaultProps = {
  pageSize: 6,
  country: 'in',
  category: 'general'
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}

export default News
