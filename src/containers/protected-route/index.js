import { Navigate } from "react-router";


function ProtectedRoute (props) {   
    if (!props.isAllowed) {
        return (
            <Navigate to={props.redirectPath} replace />
        )
    }

    return props.children
}



export default ProtectedRoute