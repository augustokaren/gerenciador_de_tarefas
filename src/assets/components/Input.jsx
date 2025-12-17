function Input(props) {
  const baseClass =
    "border border-slate-300 outline-slate-400 px-4 py-2 rounded-md w-full";

  // Se `multiline` for verdadeiro, renderiza um <textarea> para permitir que
  // o usuário veja várias linhas enquanto digita (ex.: descrição longa).
  if (props.multiline) {
    return (
      <textarea
        placeholder={props.placeholder}
        className={
          `${baseClass} resize-y` +
          (props.className ? ` ${props.className}` : "")
        }
        value={props.value}
        onChange={props.onChange}
        rows={props.rows || 3}
      />
    );
  }

  return (
    // Componente de input padrão; ocupa 100% da largura do contêiner pai.
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={baseClass + (props.className ? ` ${props.className}` : "")}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;
