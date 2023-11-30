import React, { useEffect} from "react";
import PropTypes from 'prop-types';
import { plural } from "../../utils";
import './style.css';


function Controls(props) {
	
	const { cartPrice, setCartPrice, setIsOpenModalCart, cartItems} = props;

	useEffect(() => {
		calcCartPrice(cartItems)
	},[cartItems] )
	
	function calcCartPrice(item) {
		
		// первоначальная стоимость корзины будет ценой первого выбраннного товара
		let price = 0;

		// проходимся по корзине товаров для подсчета общей суммы корзины
		item.map(item => {
			price = item.price * item.count + price   // тут что-то
		})

		// устанавливаем состояние цены корзины
		setCartPrice(price)
	}


  return (
	<div className='Controls'>
		<div className="Controls-cart">
			  <div className="Controls-name" >В корзине: </div>
			  <div className="Controls-items">
				  {
					  cartItems.length > 0
						  ? (`${cartItems.length} 
						  	  ${plural(cartItems.length, { one: 'товар', few: 'товара', many: 'товаров', })} 
							  /
							  ${cartPrice.toLocaleString()} ₽`)
						  : 'пусто'
				  }
			  </div>
		</div>	
		  <button onClick={() => setIsOpenModalCart(true)}>Перейти</button>
    </div>
  )
} 

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Controls);
