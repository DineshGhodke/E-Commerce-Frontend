import React from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => <div>लोड होत आहे...</div>;

const productData = [
    {
        id: 1,
        image: "/ClothImages/Tshirt2.jpeg",
        title: "Hand Painted Blue Kaushal",
        desc: "Description for Product 1",
        price: 150,
        trending: true,
        quantity: 1,
        category: "Fashion"
    },
    {
        id: 2,
        image: "/ClothImages/shirt2.jpeg",
        title: "Kaushalam kalash Copper P",
        desc: "Description for Product 2",
        price: 120,
        trending: true,
        quantity: 1,
        category: "Fashion"
    },
    {
        id: 3,
        image: "/ClothImages/girlTop.jpeg",
        title: "Hand Painted Blue Kaushal",
        desc: "Description for Product 3",
        price: 130,
        trending: true,
        quantity: 1,
        category: "Fashion"
    },
    {
        id: 4,
        image: "/ClothImages/girlTop1.jpeg",
        title: "Hand Painted Blue Kaushal",
        desc: "Description for Product 4",
        price: 120,
        trending: true,
        quantity: 1,
        category: "Fashion"
    }
];

const ClothProductCard = () => {
    const navigate = useNavigate(); 
    return (
        <div className='mt-4'>
            <div className='mb-4'>
                <h1 className='h4'>BestSelling Products</h1> {/* Smaller Heading */}
            </div>

            <div className='container'>
                <div className='row'>
                    {productData.map((item, index) => {
                        const { image, title, price } = item;
                        return (
                            <div key={index} className='col-12 col-sm-6 col-md-3 mb-3'> {/* Reduced column size */}
                                <div className='card h-100'> {/* Removed custom height */}
                                    <img 
                                      onClick={()=> navigate('/productInfo')} // Navigate to product info page on click
                                        className='card-img-top' 
                                        src={image} 
                                        alt="product" 
                                        style={{ height: '150px', objectFit: 'contain' }} 
                                    /> {/* Smaller image */}
                                    <div className='card-body d-flex flex-column justify-content-between'> {/* Flexbox for layout */}
                                        <h5 className='card-title'>{title.substring(0, 20)}</h5> {/* Shortened title */}
                                        <p className='card-text'>₹ {price}</p>
                                    </div>
                                    <div className='card-footer'>
                                        <button className='btn btn-primary btn-sm w-100'>Add to Cart</button> {/* Smaller button */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ClothProductCard;