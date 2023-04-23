import Header from './../../components/common/Header/Header'
import heroImg from './../../assets/img/home/hero.png'
import diningSection from './../../assets/img/home/dining.jpg'
import orderSection from './../../assets/img/home/order.jpg'
import user1 from './../../assets/img/home/user1.jpg'
import user2 from './../../assets/img/home/user2.jpg'
import user3 from './../../assets/img/home/user3.jpg'
import user4 from './../../assets/img/home/user4.jpg'
import user5 from './../../assets/img/home/user5.jpg'
import user6 from './../../assets/img/home/user6.jpg'

import { Link } from 'react-router-dom';
import { freshFood, delievery, hotel } from './../../assets/icon';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

function Home() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    variableWidth: true,
  };
  return (
    <>
      <main>
        <Header />
        <section className="hero">
          <div className="container">
            <div className="content-wrap">
              <div className="left-wrap">
                <h1 className='title'>My Two Three Liner Title Testing For Page</h1>
                <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, optio minima pariatur ipsum</p>
                <button className='cta'><Link to='./signup'>Start Ordering!</Link></button>
              </div>
              <div className="right-wrap">
                <img src={heroImg} alt='Lunch Box' />
              </div>
            </div>
          </div>
        </section>

        <section className="feature">
          <div className="container">
            <h2 className='title'>Our Features Section! Check it out!</h2>
            <ul className="card-wrap">
              <li>
                <h3 className="title">Fresh Food</h3>
                <div className="icon-wrap" dangerouslySetInnerHTML={{ __html: freshFood() }}></div>
                <p className="desc">Lorem ipsum dolor sit amet consectetur, sit amet consecteturdolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita harum, earum, doloribus perferendis et deserunt natus facere minus, qui nobis non iste distinctio eveniet officia at atque culpa modi magni!</p>
              </li>
              <li>
                <h3 className="title">Fast Delievery</h3>
                <div className="icon-wrap" dangerouslySetInnerHTML={{ __html: delievery() }}></div>
                <p className="desc">Lorem ipsum dolor sit amet consectetur, sit amet consecteturdolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita harum, earum, doloribus perferendis et deserunt natus facere minus, qui nobis non iste distinctio eveniet officia at atque culpa modi magni!</p>
              </li>
              <li>
                <h3 className="title">Dining Space</h3>
                <div className="icon-wrap" dangerouslySetInnerHTML={{ __html: hotel() }}></div>
                <p className="desc">Lorem ipsum dolor sit amet consectetur, sit amet consecteturdolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita harum, earum, doloribus perferendis et deserunt natus facere minus, qui nobis non iste distinctio eveniet officia at atque culpa modi magni!</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="dining">
          <div className="container">
            <div className="content-wrap">
              <div className="left-wrap">
                <img src={diningSection} alt='Lunch Box' />
              </div>
              <div className="right-wrap">
                <h2 className='title'>Our Dining Space, Elegant and Beautiful</h2>
                <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, optio minima pariatur ipsum</p>
                <button className='cta'><Link to='./contact'>Book Now!</Link></button>
              </div>
            </div>
          </div>
        </section>

        <section className="order">
          <div className="container">
            <div className="content-wrap">
              <div className="left-wrap">
                <h2 className='title'>Get Good Tasting Food Delievered to You!</h2>
                <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, optio minima pariatur ipsum</p>
                <button className='cta'><Link to='./login'>Order Now!</Link></button>
              </div>
              <div className="right-wrap">
                <img src={orderSection} alt='Lunch Box' />
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial">
          <div className="container">
            <h2 className='title'>Here is what our Customers wants to Say!</h2>
            <div className='slider-wrap'>
              <Slider {...settings}>
                <div className='card'>
                  <div className="content-wrap">
                    <h3 className='name'>Audrey Romero</h3>
                    <div className="img-wrap">
                      <img src={user1} alt="" />
                    </div>
                    <p className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error odit, vel delectus maxime est quidem nesciunt ducimus illo sequi voluptatem magni, omnis officiis aperiam quibusdam sapiente impedit ea ratione labore.</p>
                  </div>
                </div>
                <div className='card'>
                  <div className="content-wrap">
                    <h3 className='name'>Brennan Moore</h3>
                    <div className="img-wrap">
                      <img src={user2} alt="" />
                    </div>
                    <p className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error odit, vel delectus maxime est quidem nesciunt ducimus illo sequi voluptatem magni, omnis officiis aperiam quibusdam sapiente impedit ea ratione labore.</p>
                  </div>
                </div>
                <div className='card'>
                  <div className="content-wrap">
                    <h3 className='name'>Andrea Neal</h3>
                    <div className="img-wrap">
                      <img src={user3} alt="" />
                    </div>
                    <p className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error odit, vel delectus maxime est quidem nesciunt ducimus illo sequi voluptatem magni, omnis officiis aperiam quibusdam sapiente impedit ea ratione labore.</p>
                  </div>
                </div>
                <div className='card'>
                  <div className="content-wrap">
                    <h3 className='name'>Austin Montgomery</h3>
                    <div className="img-wrap">
                      <img src={user4} alt="" />
                    </div>
                    <p className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error odit, vel delectus maxime est quidem nesciunt ducimus illo sequi voluptatem magni, omnis officiis aperiam quibusdam sapiente impedit ea ratione labore.</p>
                  </div>
                </div>
                <div className='card'>
                  <div className="content-wrap">
                    <h3 className='name'>Lily Hansen</h3>
                    <div className="img-wrap">
                      <img src={user5} alt="" />
                    </div>
                    <p className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error odit, vel delectus maxime est quidem nesciunt ducimus illo sequi voluptatem magni, omnis officiis aperiam quibusdam sapiente impedit ea ratione labore.</p>
                  </div>
                </div>
                <div className='card'>
                  <div className="content-wrap">
                    <h3 className='name'>Justin Fleming</h3>
                    <div className="img-wrap">
                      <img src={user6} alt="" />
                    </div>
                    <p className='desc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error odit, vel delectus maxime est quidem nesciunt ducimus illo sequi voluptatem magni, omnis officiis aperiam quibusdam sapiente impedit ea ratione labore.</p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="logo-wrap">
            <Link to="/"><h1>Lunch Box</h1></Link>
          </div>
          <div className="footer-text">This project is designed and developed by <a href="https://vaishak101.netlify.app/" target='_blank' rel="noreferrer">Vaishak Nair!</a></div>
        </div>
      </footer>
    </>
  )
}

export default Home;