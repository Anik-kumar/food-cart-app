import cls from "./Input.module.css";


const Input = props => {
  return (
    <div className={cls.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  )
}

export default Input;