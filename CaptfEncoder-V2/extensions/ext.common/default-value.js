// https://github.com/sttk/default-value

const is = require('is')

function defaultValue(value, defValue, type='string') {
  if (value == null) {
    return defValue;
  }



  if (type.toLowerCase() == 'number') { 
    if (is.number(value)) {
      return value
    }
        
    value = Number(value);

    if (!Number.isNaN(value)) {
      return value
    }

    return defValue;
  }

  if (type.toLowerCase() == 'boolean') {    
    if (is.boolean(value)) {
      return value
    }
   
    if (is.string(value)) {
      value = (value.toLowerCase() === 'true')

      return value
    } 

    return defValue;
  }


  if (type.toLowerCase() == 'string') {    
    if (is.string(value)) {
      return value
    } 

    return value.toString();
  }


  return defValue;

  /*

  if (typeof type !== 'string') {
    type = objectType(defValue);
  }

  if (objectType(value) === type || typeof value === type) {
    return value;
  }
  */

  
}

function objectType(value) {
  return Object.prototype.toString.call(value);
}

module.exports = defaultValue;


// test

// console.log(objectType(true))
// console.log(typeof true)
// console.log(typeof 1)


// console.log(Number.isNaN('xyx'))
// console.log(Number.isNaN('1000'))
// console.log(Number(1000))
// console.log(Number('1000'))
// console.log(Number('xyx'))

// console.log(is.number('aaaa'))
// console.log(is.number('1111'))
// console.log(is.number(1111))

// console.log(is.number('aaaa'))
// console.log(is.number('1111'))
// console.log(is.number(1111))