import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const isModalCart = store.getState().isModalCart;

  const [cartItems, setCartItems] = useState([]); // состояние корзины с тоавароми
  const [cartPrice, setCartPrice] = useState(0); //стоимость товаров в корзине

  const callbacks = {
	setIsOpenModalCart: useCallback((code) => {
		store.setIsOpenModalCart(code);
	}, [store]),
  }
	
  return (
    <PageLayout>
  	   <Head title='Магазин'/>
		  <Controls
			  store={store}
			  cartItems={cartItems}
			  cartPrice={cartPrice}
			  setCartPrice={setCartPrice}
			  setIsOpenModalCart={callbacks.setIsOpenModalCart}
			  
		  />
		  
		  <List
			  store={store}
			  list={list}
			  cartItems={cartItems}
			  setCartItems={setCartItems}
			  cartPrice={cartPrice}
			  setCartPrice={setCartPrice}
			  setIsOpenModalCart={callbacks.setIsOpenModalCart}
			  isModalCart = {isModalCart}
			  
		  />
		  
		  {isModalCart
			? <Cart
				store = {store}
				cartItems={cartItems}
				setCartItems={setCartItems}
				cartPrice={cartPrice}
				setIsOpenModalCart={callbacks.setIsOpenModalCart}
			  />
			: null}
    </PageLayout>
  );
}

export default App;
