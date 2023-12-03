import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import './style.css';

function Item(props) {

  const { setCartItems, item, button, isModalCart, deleteItemFromCart} = props;

  return (
	
    <div className={'Item'} >
      	<div className='Item-code'>{item.code}</div>
		<div className='Item-title'>{item.title}</div>
		<div className={`Item-price ${isModalCart ? 'cart' : ''}`}>{item.price.toLocaleString()} <span>₽</span></div>
		  {isModalCart ? <div className='Item-count'>{item.count} <span> шт</span></div> : null}
		  
		<div className='Item-actions'>
			<button onClick={isModalCart ? () => deleteItemFromCart(item) : () => setCartItems (item)}>
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
  isModalCart: PropTypes.bool,
  button: PropTypes.string,
  deleteItemFromCart: PropTypes.func,
  setCartItems: PropTypes.func,
};

Item.defaultProps = {
	deleteItemFromCart: () => {},
	setCartItems: () => {},
  }

export default React.memo(Item);
