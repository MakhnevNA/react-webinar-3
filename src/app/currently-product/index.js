import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemInfo from '../../components/item-info';

function CurrentlyProduct() {

	const store = useStore();
	const activeModal = useSelector(state => state.modals.name);

	const callbacks = {
		
		// Закрытие любой модалки
		closeModal: useCallback(() => store.actions.modals.close(), [store]),

		// открытие модалки
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),

		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
	}

	
	const select = useSelector(state => ({
		list: state.currentItem.list,
		amount: state.basket.amount,
		sum: state.basket.sum
	}));

	// в массиве зависимостей массив с выбранным товаров
	useEffect(() => {
		// при открытии страницы с подробным описанием - закрываем все модалки если они октрыты
		activeModal === 'basket' && callbacks.closeModal()
	}, [select.list])

	return (
		<PageLayout>
			<Head title={select.list.title} />
			<BasketTool amount={select.amount} sum={select.sum} onOpen={callbacks.openModalBasket} />
			<ItemInfo currentItem={select.list} onAdd={callbacks.addToBasket}/>
		</PageLayout>
	);
}

export default memo(CurrentlyProduct);
