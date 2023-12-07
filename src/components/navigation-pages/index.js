import { useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from "../../store/use-store";
import './style.css'

function NavigationPages() {
	
	const cn = bem('NavigationPages');

	const store = useStore();

	const [allPagesArr, setAllPagesArr] = useState([])
	const [currentPage, setCurrentPage] = useState(1)


	useEffect(() => {
		store.actions.catalog.calcAllPages(currentPage)
			.then(data => setAllPagesArr(data.allPagesArr))
	}, [currentPage])

	
	function page(e, currentPage) {
		store.actions.catalog.openNewPage(e,currentPage)
		setCurrentPage(+e.currentTarget.textContent)
	}

	return (
		
		<div className={cn()}> 
			<div className={cn('list')}>

				{allPagesArr.map((item, i) => {
					if (item === '*') {
						return <div key={item + i} className={cn('ellipsis')}>...</div>
					}
					return <button key={item} className={cn(`item ${currentPage === item && 'active'}`)} onClick={(e) => page(e, e.currentTarget.textContent)}>{item}</button>
				})}
				
			</div>
		</div>
	)
}


export default NavigationPages