import React from "react";
import PropTypes from "prop-types";
import './style.css'


function Modal({ children, setIsOpenModalCart }) {
	
	return (
		<div className="Modal">
			<div className="Modal-container">
				<div className="Modal-header">
					<button onClick={() => setIsOpenModalCart(false)}>Закрыть</button>
				</div>
				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
	children: PropTypes.node,
	setIsOpenModalCart: PropTypes.func
}
Modal.defaultProps = {
	setIsOpenModalCart: () => {},
}
export default React.memo(Modal);