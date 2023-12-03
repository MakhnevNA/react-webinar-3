import React, { useEffect} from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';


function Controls(props) {
	
  const {setIsOpenModalCart, calcCartPrice, totalPrice, cartItems} = props;
  
  useEffect(() => {
  	calcCartPrice(cartItems)
  }, [cartItems] )

  return (
	<div className='Controls'>
		<div className="Controls-cart">
			  <div className="Controls-name" >В корзине: </div>
			  <div className="Controls-items">
				  {
					  cartItems.length > 0
						? <> 
							  <span style={{'marginRight': '6px'}}>{cartItems.length}</span>
							  <span>{plural(cartItems.length, { one: 'товар', few: 'товара', many: 'товаров', })} </span>
							  <span style={{'marginRight': '5px'}}>/</span>
							  <span className="Controls-totalPrice">{totalPrice.toLocaleString()}</span>₽
						  </>
						: 'пусто'
				  }
			  </div>
		</div>	
		<div className="Controls-actions">
			<button onClick={() => setIsOpenModalCart(true)}>Перейти</button>
		</div>
		  
    </div>
  )
} 

Controls.propTypes = {
  setIsOpenModalCart: PropTypes.func,
  calcCartPrice: PropTypes.func,
  totalPrice: PropTypes.number,
  cartItems: PropTypes.array
};

Controls.defaultProps = {
  setIsOpenModalCart: () => {},
  calcCartPrice: () => {},
}

export default React.memo(Controls);
