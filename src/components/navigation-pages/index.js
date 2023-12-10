import { useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css'

function NavigationPages({load, currentPage, allPagesArr, openNewPage}) {
	
	const cn = bem('NavigationPages');

	useEffect(() => {
		load(currentPage)
	}, [currentPage])

	return (
		
		<div className={cn()}> 
			<div className={cn('list')}>

				{allPagesArr.map((item, i) => {
					if (item === '*') {
						return <div key={item + i} className={cn('ellipsis')}>...</div>
					}
					return <button key={item} className={cn(`item ${currentPage === item && 'active'}`)} onClick={(e) => openNewPage(e, currentPage, +e.currentTarget.textContent)}>{item}</button>
				})}
				
			</div>
		</div>
	)
}


export default NavigationPages