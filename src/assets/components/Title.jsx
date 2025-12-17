function Title(props) {
  // Componente de título: usa texto branco para que o título se destaque
  // sobre o gradiente laranja→amarelo usado na aplicação.
  return (
    <h1 className="text-3xl text-white font-bold text-center">
      {props.children}
    </h1>
  );
}

export default Title;
