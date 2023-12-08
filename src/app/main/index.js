import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import NavigationPages from '../../components/navigation-pages';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
		return <Item item={item} onAdd={callbacks.addToBasket} store={store} />
    }, [callbacks.addToBasket]),
  };

  const [allPagesArr, setAllPagesArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
	  <NavigationPages
	  		store={store}
	  		allPagesArr={allPagesArr}
	  		setAllPagesArr={setAllPagesArr}
	  		currentPage = {currentPage}
	  		setCurrentPage = {setCurrentPage}
	  />
    </PageLayout>

  );
}

export default memo(Main);
