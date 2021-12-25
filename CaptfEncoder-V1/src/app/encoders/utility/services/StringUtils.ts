var _  = require('underscore');
const _s = require('underscore.string');

export class StringUtils {

  /**
   * 将字符串的第一个字母转换为大写。
   * @param str 
   */
  public static capitalize(str){
    return _s.capitalize(str);
  }

  /**
   * 
   * @param str 
   */
  public static decapitalize(str){
    return _s.decapitalize(str);
  }

  /**
   * 
   * @param str 
   */
  public static swapCase(str){
    return _s.swapCase(str);
  }

  /**
   * 
   * @param str 
   */
  public static titleize(str){
    return _s.titleize(str);
  }

  /**
   * 
   * @param str 
   */
  public static classifye(str){
    return _s.classifye(str);
  }

  /**
   * 将下划线或者中划线字符转换成 camelized
   * @param str 
   */
  public static camelize(str){
    return _s.camelize(str);
  }

  /**
   * 将camelized 或者中划线转化成下划线
   * @param str 
   */
  public static underscored(str){
    return _s.underscored(str);
  }


  /**
   * 将camelized 或者下划线转化成中划线
   * @param str 
   */
  public static dasherize(str){
    return _s.underscored(str);
  }

  /**
   * 返回颠倒的字符串
   * @param str 
   */
  public static reverseString(str) {
    return _s.reverse(str);
  }




  public static reverseText(str) {

  }
}



/**
 * xor
 *     for (var i = 0; i < str.length; ++i) {
      output += String.fromCharCode(key ^ str.charCodeAt(i))
}
 */