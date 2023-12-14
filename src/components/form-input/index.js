import {cn as bem} from "@bem-react/classname"
import "./style.css"

function FormInput(props) {
  const cn = bem("FormInput");

  return (
    <div className={cn()}>
        <div className={cn('title')}>{props.title}</div>
        <input
            className={cn('input')}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeholder}
            required={props.required}
        />
    </div>
  );
}

export default FormInput;