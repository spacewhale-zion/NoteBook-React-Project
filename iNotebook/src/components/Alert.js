import React from 'react'

function Alert(props) {
  const capitalize=(word)=>{
    if(word==="danger"){
      word="error";
    }
    const lower=word.toLowerCase();
    return word[0].toUpperCase()+word.slice(1);
  }
  return(
  
   props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
  </div>
  
  );
}

export default Alert