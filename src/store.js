import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление товара из корзины
   * @param code
   */ 
  deleteItemFromCart(code){
	this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code.code) // Новый список товаров в корзине, в котором не будет удаляемого товара
    })
  }

  /**
   * Открытие/закрытие модалки с корзиной
   * @param code
   */
  setIsOpenModalCart() {
	this.setState({
		...this.state,
		isModalCart: !this.state.isModalCart
	})
  }
	
  /**
   * Добавление товара в корзину
   * @param item
   */
  setCartItems (item){
	
	// проверяем, есть ли уже добавляемый товар в корзине
	const isCode = this.state.cartItems.findIndex((code) => code.code === item.code)
	  
	  // если есть, то count увеличиваем на 1. 
	if (isCode > -1) {
		this.state.cartItems[isCode].count += 1;  // увеличиваем количество выбранного товара на 1
		
		// обновляем данные состояния
		this.setState({
			...this.state,
			cartItems: [...this.state.cartItems]
		})

	} else {
		item.count = 1; // добавляем свойство, которое будет только у обьъектов в корзине. Количество данного товара в корзине
		this.setState({
			...this.state,
			cartItems: [...this.state.cartItems, item]
		}) // добавляем карточку товара в состояне корзины	
	}
  }
	
  /**
   * Подсчет стоимости корзины
   * @param item
   */
  calcCartPrice(item){
	
	// первоначальная стоимость корзины будет ценой первого выбраннного товара
	let price = 0;

	// проходимся по корзине товаров для подсчета общей суммы корзины
	item.map(item => {
		price = item.price * item.count + price
	})

	// устанавливаем состояние цены корзины
	this.setState({
		...this.state,
		totalPrice: price
	}) 
  }
}

export default Store;
