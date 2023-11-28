/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.lastMaxCode = [];
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
            this.listeners = this.listeners.filter((item) => item !== listener);
        };
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
     * Добавление новой записи
     */
    addItem() {
        this.setState({
            ...this.state,
            list: [
                ...this.state.list,
                { code: this.generateId(), title: "Новая запись" },
            ],
        });
    }

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.lastMaxCode.push(code); // если бы после удаления последней записи можно было использовать еще раз ее code, то этой записи бы не было
        this.setState({
            ...this.state,
            list: this.state.list.filter((item) => item.code !== code),
        });
    }

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map((item) => {
                if (item.code === code) {
                    item.selected = !item.selected;
                    item = {
                        ...item,
                        highlightedCount: item.selected
                            ? (item.highlightedCount || 0) + 1
                            : item.highlightedCount,
                    };
                } else {
                    item.selected = false;
                }
                return item;
            }),
        });
    }

    generateId() {
        // создаем массив со значениями всех code
        const maxCurrentCode = this.state.list.map((item) => item.code);
        // находим max значение среди массива выше и последнейго значения
        const max = Math.max(...maxCurrentCode, ...this.lastMaxCode);

        // возращаем инкрементированное значение
        return max + 1;
    }

    pluralizationString(highlightedCount) {
        highlightedCount = Math.abs(Math.floor(highlightedCount));

        if (highlightedCount % 10 === 1 && highlightedCount % 100 !== 11) {
            return "раз";
        } else if (
            highlightedCount % 10 >= 2 &&
            highlightedCount % 10 <= 4 &&
            (highlightedCount % 100 < 10 || highlightedCount % 100 >= 20)
        ) {
            return "раза";
        } else {
            return "раз";
        }
    }
}

export default Store;
