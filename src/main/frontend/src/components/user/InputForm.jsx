function InputForm(props) {
  return (
    <div>
        <div className='input-form-box'>
          <input className='form-control' type={props.type} name={props.name} placeholder={props.place+" 입력해 주세요"}/>
        </div>
    </div>
  );
}

export default InputForm;