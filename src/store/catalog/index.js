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

  async load(pageNum = 1) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${10 * (pageNum - 1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
	  allPages: Math.ceil((json.result.count / 10)),
	  currentPage: pageNum
    }, 'Загружены товары из АПИ');
  }
  
  async openNewPage(e, skip, number){
	e.preventDefault()
	let skipPage = (skip - 1) * 10;
	const response = await fetch(`/api/v1/articles?limit=10&skip=${skipPage}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
		list: json.result.items,
		currentPage: number,
	}, 'Загружены товары из АПИ по нужной странице');
	  

  }
  
//   setCurrentPage(number) {
//     this.setState({
//       ...this.getState(),
//       currentPage: number,
//     });
//   }
  
  	// openNewPageAndSetCurrentPage(e, currentPage, setCurrentPage) {
	// 	this.openNewPage(e, currentPage)
	// 	setCurrentPage(+e.currentTarget.textContent)
	// }


}

export default Catalog;
