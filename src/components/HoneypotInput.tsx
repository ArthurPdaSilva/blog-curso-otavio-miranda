// Para pegar bots, que se ele é preenchido, a aplicação pega esse cara
export function HoneypotInput() {
  return (
    <input
      className="niceInput"
      name="teste"
      type="text"
      autoComplete="new-password"
      tabIndex={-1}
      defaultValue=""
    />
  );
}
