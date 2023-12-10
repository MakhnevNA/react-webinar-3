/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function generationPageList (activePage, maxPage){

	const allPagesArr = [];
		
	// в массив пушим номер пред, текущую страницу и след страниц
	if (activePage) {
		allPagesArr.push(activePage)
		allPagesArr.push(activePage + 1)
		allPagesArr.unshift(activePage - 1)
	}
		
	// активная страница это не 1 и не 2, тогда в начало за 1 элемент до текущей страницы  вставляем звездчоку
	if(activePage !== 1 && activePage !== 2 && activePage !== 3){
		allPagesArr.unshift('*')
	}

	// если последняя странца совпадает с активной, то последний элемент удаляем
	if (activePage === maxPage) {
		allPagesArr.pop()
	}
		
	// для 1, и последних трех страниц не пушим  * в конец
	if((activePage !== 1) && (activePage + 2 !== maxPage) && (activePage + 1 !== maxPage) && (activePage!== maxPage)){
		allPagesArr.push('*')
	}
		
	// если номер страницы больше 2, то чтобы вначале подгружалась 1
	if (activePage > 2) {
		allPagesArr.unshift(1)
	}

	// если номер страницы равен 1, то чтобы  не было 0 вначале, и нумерация захватывала 3, еще и звездочку в конец
	if (activePage === 1) {
		allPagesArr.shift(1)
		allPagesArr.push(activePage + 2)
		allPagesArr.push('*')
	}

	// если последняя страница не равна текущей + 1, и последняя страница не равна текущей то в конце пушим последнюю страницу
	if((maxPage !== activePage + 1) && activePage !== maxPage ){
		allPagesArr.push(maxPage)
	}
		
	return { allPagesArr }
}
