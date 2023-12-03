import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List(props) {
	
  const {list, isModalCart, setCartItems, cartItems, deleteItemFromCart} = props;
	
  return (
	<div className='List'>
		
		{list?.map(item =>
			<div key={item.code} className='List-item'>
				<Item
					item={item}
					isModalCart={isModalCart}
					setCartItems={setCartItems}
					button='Добавить'
				/>
			</div>
		)}


		{isModalCart 
			? cartItems?.map(item =>
				<div key={item.code} className='List-item'>
					<Item
						item={item}
						isModalCart={isModalCart}
						setCartItems={setCartItems}
						deleteItemFromCart={deleteItemFromCart}
						button='Удалить'
						/>
				</div>
			) 
			: null
		}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  isModalCart: PropTypes.bool,
  cartItems: PropTypes.array,
  setCartItems: PropTypes.func,
  deleteItemFromCart: PropTypes.func,
};

List.defaultProps = {
	setCartItems: () => {},
	deleteItemFromCart: () => {},
}


export default React.memo(List);
