function Input({props, name, onChange}) {
  return (
    <div>
        <label>{props}<input type="text" name={name} onChange={onChange}></input></label>
    </div>
  )
}

export default Input