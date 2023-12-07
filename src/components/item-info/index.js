import { cn as bem } from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css'

function ItemInfo({currentItem, onAdd}) {
	const cn = bem('ItemInfo');


	const callbacks = {
		onAdd: (e) => onAdd(currentItem._id)
	  }
	  
	return (
		<div className={cn()}>
			<div className={cn('description')}>
				{currentItem?.description}
			</div>
			<div className={cn('country')}> Страна производитель: <span>{currentItem.madeIn?.title} ({currentItem.madeIn?.code})</span> </div>
			<div className={cn('category')}>Категория: <span>{currentItem.category?.title}</span></div>
				<div className={cn('year')}>Год выпуска: <span>{currentItem.edition}</span></div>
			<div className={cn('price')}>Цена: <span>{numberFormat(currentItem.price)} ₽</span></div>
			<button onClick={callbacks.onAdd}>Добавить</button>
		  </div>
	)
}
  
export default ItemInfo