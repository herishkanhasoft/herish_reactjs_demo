import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, searchdata, setPreviousPageNum } from '../redux/ArticleSlice';

function News() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.newsData.allData);
  const currentPage = useSelector((state) => state.newsData.currentPage);
  const [inputdata, setInputData] = useState('');
  const [ButtonOnOff, setButtonOff] = useState(false);
  const [hidePagination, setHidePagination] = useState();
  const data = selector?.results;

  useEffect(() => {
    dispatch(fetchNews());
  }, []);
  console.log(hidePagination, 'hidepagination');
  const handleSubmit = () => {
    dispatch(searchdata(inputdata));
    setInputData('');
  };

  const goToNextPage = (nextpage) => {
    setButtonOff(true);
    dispatch(fetchNews(nextpage));
    dispatch(setPreviousPageNum({ id: nextpage }));
  };

  const setPreviousPage = () => {
    const tryToFindCurrent = selector?.nextPage;
    const nextPageData = currentPage?.find((item) => item.currentId === tryToFindCurrent);
    const currentPageIndex = currentPage[nextPageData?.index - 2]?.index;
    if (currentPageIndex === 2) {
      setButtonOff(false);
    }
    if (currentPageIndex === undefined) {
      const previouspage = [...currentPage];
      const id = previouspage[previouspage.length - 2].currentId;
      dispatch(fetchNews(id));
    } else {
      const id = currentPage[currentPageIndex - 2].currentId;
      dispatch(fetchNews(id));
    }
  };

  return (
    <div className="BlogDive">
      <div>
        <form className="d-flex input-group w-25 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
            onChange={(e) => {
              if (e.target.value === '') {
                setHidePagination(false);
                dispatch(fetchNews());
              } else {
                setHidePagination(true);
                setInputData(e.target.value);
              }
            }}
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>

      <div className="">
        {selector?.nextPage && (
          <button
            onClick={() => {
              goToNextPage(selector.nextPage);
            }}
            className="btn btn-info mx-1 my-2"
          >
            Next page
          </button>
        )}

        {ButtonOnOff && (
          <button
            className="btn btn-info mx-1 my-2"
            onClick={() => {
              setPreviousPage();
            }}
          >
            Previous page
          </button>
        )}
      </div>
      <h1>Blogs</h1>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data?.map((item, index) => (
          <div className="card" key={index}>
            {item.image_url && <img src={item.image_url} className="card-img-top" alt="" />}
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text description">{item.description}</p>
              <button onClick={() => navigate(`/article/${item.article_id}`)} className="btn btn-secondary">
                Read more...
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
