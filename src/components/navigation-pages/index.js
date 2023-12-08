import { useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import useStore from "../../store/use-store";
import './style.css'

function NavigationPages({store, allPagesArr, setAllPagesArr, currentPage, setCurrentPage}) {
	
	const cn = bem('NavigationPages');

	useEffect(() => {
		store.actions.catalog.calcAllPages(currentPage)
			.then(data => setAllPagesArr(data.allPagesArr))
	}, [currentPage])

	return (
		
		<div className={cn()}> 
			<div className={cn('list')}>

				{allPagesArr.map((item, i) => {
					if (item === '*') {
						return <div key={item + i} className={cn('ellipsis')}>...</div>
					}
					return <button key={item} className={cn(`item ${currentPage === item && 'active'}`)} onClick={(e) => store.actions.catalog.openNewPageAndSetCurrentPage(e, currentPage, setCurrentPage, )}>{item}</button>
				})}
				
			</div>
		</div>
	)
}


export default NavigationPages