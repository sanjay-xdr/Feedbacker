const validateObject= (obj)=> {
    for (let key in obj) {
      if (!obj[key]) {
        return key; 
      }
    }
    return true;
  }


  export {validateObject}