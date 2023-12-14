import {cn as bem} from "@bem-react/classname"
import FormInput from "../form-input";
import "./style.css"

function Form (props) {
    const cn = bem('Form')
    return (
        <div className={cn()}>
            <div className={cn('title')}>{props.title}</div>
            <form className={cn('fields')} onSubmit={props.onSubmit}>
                {props.fields.map((field, index) => (
                    <FormInput {...field} key={index}/>
                ))}
                {props.error && <div className={cn('error')}>{props.error}</div>}
                <button>{props.buttonTitle}</button>
            </form>  
        </div>
    )
}





export default Form;