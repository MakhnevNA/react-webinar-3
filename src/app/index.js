import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import CurrentlyProduct from './currently-product';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
	
  return (
    <>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main/>} />
				<Route path='/itemInfo/:id' element={<CurrentlyProduct/>} />
			</Routes>
			{activeModal === 'basket' && <Basket/>}
		</BrowserRouter>  
    </>
  );
}

export default App;
