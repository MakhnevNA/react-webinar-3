import React from "react";
import Head from "../head"
import List from "../list";
import PropTypes from "prop-types";
import './style.css'


function Cart(props) {

	const {cartItems, setCartItems, totalPrice, isModalCart, deleteItemFromCart} = props;

	return (
		<>
			<Head title='Корзина'/>
			<div className="Cart_body">
				<List
					cartItems={cartItems}
					setCartItems={setCartItems}
					isModalCart={isModalCart}
					button='Удалить'
					deleteItemFromCart={deleteItemFromCart}
				/>
			</div>
			<div className={`Cart_summary ${!totalPrice ? 'Cart_empty' : ''}`} >
					
				{totalPrice 
				? <>
					<span className="Cart_total">Итого</span>
					<span className="Cart_price"> {totalPrice.toLocaleString()} ₽</span>
				</> 
				: <span 
					className="Cart_total" 
					style={{ 'fontSize': '32px', 'margin': '0px' }}>
							Корзина пуста
					</span>
				}
			</div>
		</>
	)
}

Cart.propTypes = {
  cartItems: PropTypes.array,
  totalPrice: PropTypes.number,
  isModalCart: PropTypes.bool,
  deleteItemFromCart: PropTypes.func,
  setCartItems: PropTypes.func,
};

Cart.defaultProps = {
	deleteItemFromCart: () => {},
	setCartItems: () => {},
  }


export default Cart	