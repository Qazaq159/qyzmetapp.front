const InputGroup = ({ label, name, value, onChange, error, type = "text" }) => (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} />
      {error && <p className="error">{error}</p>}
    </div>
);
export default InputGroup;
  