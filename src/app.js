import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import Modal from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const isModalCart = store.getState().isModalCart;
  const cartItems = store.getState().cartItems;
  const totalPrice = store.getState().totalPrice;

  const callbacks = {
	setIsOpenModalCart: useCallback((code) => {
		store.setIsOpenModalCart(code);
	}, [store]),
	  
	setCartItems: useCallback((item) => {
		store.setCartItems(item);
	}, [store]),

	calcCartPrice: useCallback((item) => {
		store.calcCartPrice(item);
	}, [store]),

	deleteItemFromCart: useCallback((code) => {
		store.deleteItemFromCart(code);
	}, [store]),
  }
	
  return (
    <PageLayout>
  	   <Head title='Магазин'/>
		  <Controls
			  setIsOpenModalCart={callbacks.setIsOpenModalCart}
			  calcCartPrice={callbacks.calcCartPrice}
			  totalPrice={totalPrice}
			  cartItems={cartItems}
		  />
		  
		  <List
			  list={list}
			  isModalCart={isModalCart}
			  setCartItems={callbacks.setCartItems}
		  />
		  
		  {isModalCart
		  	? <Modal setIsOpenModalCart={callbacks.setIsOpenModalCart}>
			  	<Cart
					cartItems={cartItems}
					setCartItems={callbacks.setCartItems}
					totalPrice={totalPrice}
					isModalCart={isModalCart}
					deleteItemFromCart={callbacks.deleteItemFromCart}
				/> 
			  </Modal>
			: null
		  }
    </PageLayout>
  );
}

export default App;
