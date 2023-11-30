import React, {useCallback, useState} from "react";
import PropTypes, { func } from "prop-types";
import { plural } from "../../utils";
import './style.css';

function Item(props) {

	const { setCartItems, item, button, store, cartItems } = props;

	const isModalCart = store.getState().isModalCart
	
	function setCart(item) {

		// проверяем, есть ли уже добавляемый товар в корзине
		const isCode = cartItems.findIndex((code) => code.code === item.code)

		// если есть, то count увеличиваем на 1. 
		if (isCode > -1) {
			cartItems[isCode].count += 1;  // увеличиваем количество выбранного товара на 1
			setCartItems([...cartItems]);  // обновляем данные состояни, чтобы был перерендер
		} else {
			item.count = 1; // добавляем свойство, которое будет только у обьъектов в корзине. Количество данного товара в корзине
			setCartItems([...cartItems, item]); // добавляем карточку товара в состояне корзины
		}

	}

	function deleteItemFromCart(code) {
		setCartItems(cartItems.filter(item => item.code !== code))
	}
	

  return (
	
    <div className={'Item'} >
      	<div className='Item-code'>{item.code}</div>
		<div className='Item-title'>{item.title}</div>
		<div className='Item-price'>{item.price.toLocaleString()} <span>₽</span></div>
		  {isModalCart ? <div className='Item-count'>{item.count} <span> шт</span></div> : null}
		  
		<div className='Item-actions'>
			<button onClick={isModalCart ? () => deleteItemFromCart(item.code) : () => setCart (item)}>
				{button}
			</button>
		</div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
	price: PropTypes.number,
	count: PropTypes.number,
  }).isRequired,
  button: PropTypes.string,
};

export default React.memo(Item);
