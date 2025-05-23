import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import the custom CSS
import img5 from '../assets/img5.jpg';
import img4 from '../assets/img4.jpg';
import img6 from '../assets/img6.jpg';
import ProductList from './ProductList';
import Categories from '../components/Category/Categories';  



const Home = () => {
  return (
    <div>
       <Categories />
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div> */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img5} className="d-block w-100 carousel-img " alt="Slide 1" />
          </div>
          
          <div className= "banner carousel-item">
            <img src={img4} className="d-block w-100 carousel-img" alt="Slide 3" />
          </div>

          <div className="carousel-item">
            <img src={img6} className="d-block w-100 carousel-img" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Featured Products Section */}
     
      <ProductList />
    
    </div>
  );
};

export default Home;



