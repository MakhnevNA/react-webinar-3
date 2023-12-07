import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load() {
    const response = await fetch(`/api/v1/articles`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }
  
  async openNewPage(e, skip){
	e.preventDefault()
	let skipPage = (skip - 1) * 10;
	const response = await fetch(`/api/v1/articles?limit=10&skip=${skipPage}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ по нужной странице');
  }
  
	
  async calcAllPages (page){
	const response = await fetch(`/api/v1/articles?limit=*&skip=0`);
    const json = await response.json();
	const allItems = json.result.items.length
	let allPages = Math.ceil((allItems / 10))
	const allPagesArr = []
	let activePage = page;

	  
	  const generateCountPages = () => {
		
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
		if (activePage === allPages) {
			allPagesArr.pop()
		}
		
		// для 1, и последних трех страниц не пушим  * в конец
		if((activePage !== 1) && (activePage + 2 !== allPages) && (activePage + 1 !== allPages) && (activePage!== allPages)){
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
		if((allPages !== activePage + 1) && activePage !== allPages ){
			allPagesArr.push(allPages)
		}
	  }

	  generateCountPages()
	  return { allPagesArr }
  }


}

export default Catalog;
