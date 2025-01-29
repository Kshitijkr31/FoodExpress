import React, { useState } from 'react';
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

const calculateDeliveryFee = () => {
  const subtotal = getTotalCartAmount();
  if (subtotal === 0) return 0; // Free delivery for an empty cart
  if (subtotal <= 150) return 30; // Small order fee
  if (subtotal <= 350) return 20; // Mid-range delivery fee
  return 0; // Free delivery for orders above 150
};

const deliveryFee = calculateDeliveryFee();
const totalAmountBeforeDiscount = getTotalCartAmount() + deliveryFee;
const totalAmount = totalAmountBeforeDiscount - discount;

const handlePromoCodeSubmit = () => {
  const validPromoCodes = {
    'DISCOUNT100': 100,
    'FREESHIP': deliveryFee, // For example, free shipping if promo code is FREESHIP
  };
  
  if (validPromoCodes[promoCode]) {
    setDiscount(validPromoCodes[promoCode]);
    toast.success('Promo Code Applied!');
  } else {
    toast.error('Invalid Promo Code!');
  }
};


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={
                    url+"/images/"+
                    item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div> 
     <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>
                ₹ {getTotalCartAmount()}
                </p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>
                ₹ {deliveryFee}
                  </p>
            </div>
            <hr/>
            <div className="cart-total-details">
                <b>Total</b>
                <b>
                ₹ {getTotalCartAmount()===0?0: totalAmount}
                  </b>
            </div>
          </div>
          <button 
          onClick={()=>navigate('/order')}
          >PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p className='promocodep'>Have a promo code? Enter it here</p>
            <div className='cart-promocode-input'>
                <input type="text" placeholder='Promo Code'  value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value)}  />
 <button onClick={handlePromoCodeSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart