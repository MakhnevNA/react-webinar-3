import React from "react";
import Head from "../head"
import Item from "../item";

import './style.css'
import { func } from "prop-types";



function Cart(props) {

	const {store, cartItems, setCartItems, cartPrice, isModalCart, onDeleteItem, setIsOpenModalCart,  } = props;

	return (
	  <div className='Cart'>
		<div className="Cart-modal">
			<div className="Cart_header">
				<Head title = 'Корзина'/>
				<button onClick={() => setIsOpenModalCart(false)}>Закрыть</button>
			</div>	
			<div className="Cart_body">
				{
					cartItems.map(item =>
						<div key={item.code} className='List-item'>
							<Item
								item={item}
								isModalCart={isModalCart}
								setCartItems = {setCartItems}
								count={item.count}
								cartItems = {cartItems}
								button='Удалить'
								onDeleteItem={onDeleteItem}
								store = {store}
								 />
						</div>
					  )	
				}
			</div>
			<div
				className={`Cart_summary ${!cartPrice ? 'Cart_empty' : null}`} >
					
				{cartPrice 
				? <>
					<span className="Cart_total">Итого</span>
					<span className="Cart_price"> {cartPrice.toLocaleString()} ₽</span>
				</> 
				: <span 
					className="Cart_total" 
					style={{ 'fontSize': '32px', 'margin': '0px' }}>
							Корзина пуста
					</span>
				}
			</div>
		</div>	  
	  </div>
	)
}
  


export default Cart	