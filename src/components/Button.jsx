const Button = ({ onClick, disabled }) => {
  return (
    <button
      disabled={ disabled }
      onClick={ onClick }
      className='submitButton'>
      Explain</button>
  );
};

export default Button;