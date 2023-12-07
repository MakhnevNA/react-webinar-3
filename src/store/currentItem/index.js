import StoreModule from "../module";

class CurrentItem extends StoreModule {

 
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }
  

  async loadCurrentItem(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`, {headers: {
		'Accept-Language': 'ru'
	  },});
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result
    }, 'Загружены выбранный товар из АПИ');
  }
}

export default CurrentItem;
