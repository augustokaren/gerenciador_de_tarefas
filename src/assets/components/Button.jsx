function Button(props) {
  // Helper de botão: aceita a prop `className` para customizar a aparência.
  // Se não for fornecida, utiliza um estilo padrão laranja para contraste.
  const base = "p-2 rounded-md inline-flex items-center justify-center";
  const classes = props.className
    ? `${base} ${props.className}`
    : `${base} bg-orange-600 text-white`;
  return (
    <button onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
}

export default Button;
