import cls from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${cls.card} ${props.className}`}
      id={props.id}
      onClick={props.onClick}
      onChange={props.onChange}
    >
      {props.children}
    </div>
  );
};

export default Card;
