import { Link } from 'react-router-dom';
import Header from './../components/common/Header/Header';

function PageNotFound() {
  return (
    <>
      <Header />
      <section className='page-404'>
        <div className="container">
          <h1>404 -  Page Not Found</h1>
          <Link to={"/"}>Go to HomePage</Link>
        </div>
      </section >
    </>
  )
}

export default PageNotFound;