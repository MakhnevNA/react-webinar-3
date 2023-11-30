import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
	
  const {list, cartItems, setCartItems, cartPrice, setCartPrice, store, isModalCart } = props;

  return (
    <div className='List'>{
      list?.map(item =>
        <div key={item.code} className='List-item'>
			<Item
				item={item}
				cartItems={cartItems}
				isModalCart={isModalCart}
				setCartItems={setCartItems}
				cartPrice={cartPrice}
				setCartPrice={setCartPrice}
				store={store}
				button='Добавить'
			 	/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
};


export default React.memo(List);
