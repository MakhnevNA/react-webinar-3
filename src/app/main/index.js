import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import NavigationPages from '../../components/navigation-pages';
import { generationPageList } from '../../utils';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
	currentPage: state.catalog.currentPage,
	allPages: state.catalog.allPages
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
	//установка текущей страницы
	setCurrentPage: useCallback((currentPage) => store.actions.catalog.setCurrentPage(currentPage),[store]),
	
	openNewPage: useCallback((e, currentPage, number) => store.actions.catalog.openNewPage(e, currentPage, number), [store]),
	
	load: useCallback((currentPage) => store.actions.catalog.load(currentPage))
	
  }

  const renders = {
    item: useCallback((item) => {
		return <Item item={item} onAdd={callbacks.addToBasket} store={store} />
    }, [callbacks.addToBasket]),
  };

  const {allPagesArr} = generationPageList(select.currentPage, select.allPages)	
  
 
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
	  <NavigationPages
	  		load ={callbacks.load}	
			openNewPage ={callbacks.openNewPage}
			allPagesArr={allPagesArr}
			currentPage = {select.currentPage}
	  />
    </PageLayout>

  );
}

export default memo(Main);
