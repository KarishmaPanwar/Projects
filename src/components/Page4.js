import React, { useState, useEffect } from 'react';
import '../css/Page2.css';
import '../css/Page4.css';
import Page3 from './Page3';
import ProdBrandHeader from './ProdBrandHeader';
import bag from '../images/BAG.png';


const Page4 = () => {

  const products = ["soap", "kurta", "salwar", "top","any","many"];
  const [data, setData] = useState([]);
  //const[product, setProduct] =useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080/content?brandId=4&type=L');
        const json = await response.json();
        console.log("results Page 4", json);
        setData(json);
       // setProduct(json[0]);
      
        console.log("product page 4",json[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const showPopup = () => {
    console.log('Div clicked!');
    setPopupOpen(true);   
  };

  const closePopup = () => {
   
    console.log('popup closed clicked!');
    setPopupOpen(false);
  };


  return (
    <div className="page4-comp">
       <div >
          <ProdBrandHeader />
            <div>
            {data.map((product, index) => (
              <div>
                <div className="page4-img-container">
                    <img src={product.link} className='page4-prod-img'/>
                </div>
                <div className='scrolling-product-wrapper'>
                      <div className='shop-all'>
                          <a className='shop-all-btn'>
                              <img src={bag} height={30} width={30} />
                          </a>
                          <a> SHOP ALL</a>
                      </div>
                      <div className='scp-all-wrapper'>
                      {product.products.map((prod, index) => (
                          <div className='scp-wrapper'>
                              <div className='scp-image-div' onClick={showPopup} style={{ backgroundImage: `url(${prod.imageUrl})`}}>
                              </div>
                              <div className='scp-desc'>
                                  <div className='scp-brand-name'><span>{prod.brandName}</span></div>
                                  <div className='scp-price'><span className='actual-price' >{prod.initialPrice != null ? (
                                      <>&#x20B9;{prod.initialPrice}</>
                                    ) : (
                                      ''
                                    )}</span>
                                  <span className='selling-price' > &#x20B9;{prod.finalPrice}</span></div>
                                  <div>
                                      <span className='scp-discount'>{prod.discountPercentage}</span>
                                      <span className='rating'>4</span>
                                  </div>
                              </div> 
                          </div>
                      ))}
                          
                    </div>
                </div>
              </div>
              ))}
            </div>
          </div>
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content" >
                <Page3 />
                <a onClick={closePopup}>Close</a>
              </div>
            </div>
          )}
    </div>
  );
}

export default Page4;
