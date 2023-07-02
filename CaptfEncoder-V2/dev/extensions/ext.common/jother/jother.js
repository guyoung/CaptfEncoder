// Reference from
// http://tmxk.org/jother/

var base=[
	"[]",          //空,相当于""
	"{}",          //[object Object]
	"![]",         //false
	"!![]",        //true
	"~[]",         //-1
	"+{}",         //NaN
	"{}[[]]"       //undefined	  
     ];
var nums=[
        "+[]",                                             //0
        "+!![]",                                           //1
        "!![]+!![]",                                       //2
        "!![]+!![]+!![]",                                  //3
        "!![]+!![]+!![]+!![]",                             //4
        "!![]+!![]+!![]+!![]+!![]",                        //5
        "!![]+!![]+!![]+!![]+!![]+!![]",                   //6
        "!![]+!![]+!![]+!![]+!![]+!![]+!![]",              //7
        "!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]",         //8
        "!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]"     //9
     ];
//Infinity=(+!![])/(+[])=1e+1000
base[7]=q1(q3(nums[1]+q4(q1(base[3])+q2(nums[3]))+q3(nums[1])+q3(nums[0])+q3(nums[0])+q3(nums[0])));
var chars={
	"0":q1(nums[0]),
	"1":q1(nums[1]),
	"2":q1(nums[2]),
	"3":q1(nums[3]),
	"4":q1(nums[4]),
	"5":q1(nums[5]),
	"6":q1(nums[6]),
	"7":q1(nums[7]),
	"8":q1(nums[8]),
	"9":q1(nums[9]),
	"a":q1(base[2])+q2(nums[1]),
	"b":q1(base[1])+q2(nums[2]),
	"c":q1(base[1])+q2(nums[5]),
	"d":q1(base[6])+q2(nums[2]),
	"e":q1(base[3])+q2(nums[3]),
	"f":q1(base[2])+q2(nums[0]),
	"i":q1(base[6])+q2(nums[5]),
	"j":q1(base[1])+q2(nums[3]),
	"l":q1(base[2])+q2(nums[2]),
	"n":q1(base[6])+q2(nums[1]),
	"o":q1(base[1])+q2(nums[1]),
	"r":q1(base[3])+q2(nums[1]),
	"s":q1(base[2])+q2(nums[3]),
	"t":q1(base[3])+q2(nums[0]),
	"u":q1(base[6])+q2(nums[0]),
	"y":q1(base[7])+q2(nums[7]),	  
	"I":q1(base[7])+q2(nums[0]),
	"N":q1(base[5])+q2(nums[0]),
	"O":q1(base[1])+q2(nums[8]),
	" ":q1(base[1])+q2(nums[7]),
	"[":q1(base[1])+q2(nums[0]),
	"]":q1(base[1])+q2(nums[7]+q4(nums[7])),
	"-":q1(base[4])+q2(nums[0]),
	"+":q1(q3(nums[1]+q4(q1(base[3])+q2(nums[3]))+q3(nums[1])+q3(nums[0])+q3(nums[0])))+q2(nums[2])//1e+100
     };
var f = "[]["+toStr("sort")+"]["+toStr("constructor")+"]";
var localstr = "[]+"+toScript("return location");
    chars["h"]=q5(localstr)+q2(nums[0]);
    chars["p"]=q5(localstr)+q2(nums[3]);
    chars[":"]=q5(localstr)+q2(nums[4]);
    chars["/"]=q5(localstr)+q2(nums[6]);
var rc_unescape = toScript("return unescape");
var rc_escape = toScript("return escape");
    chars["%"]=rc_escape+"("+toStr("[")+")"+q2(nums[0]);
function q1(s){return "("+s+"+[])";}
function q2(s){return "["+s+"]";}
function q3(s){return "+("+s+"+[])";}
function q4(s){return "+"+s;}
function q5(s){return "("+s+")";}
function toScript(script){return f+"("+toStr(script)+")()";}
function toUnescape (charCode) {return rc_unescape + "(" + toStr("%" + toHex(charCode, 2)) + ")";}
function toHexs (charCode) { return toStr("\\x" + toHex(charCode, 2));}
function toUnicode (charCode) { return toStr("\\u" + toHex(charCode, 4)); }     
function toHex(num,d) {
        var hex = num.toString(16);
        while (hex.length<d) { hex = "0" + hex;}
        return hex;
    }
function toChar(char){
	var charCode=char.charCodeAt(0);
        var unis,unes,hexs;
 	if (chars[char] !== undefined) { return chars[char];}
        if ((char === "\\") || (char == "x")) {
            chars[char] = toUnescape(charCode);
            return chars[char];
        }
        unis = toUnicode(charCode);
        if (charCode < 128) {
            unes = toUnescape(charCode);
            if (unis.length > unes.length) { unis = unes; }
            hexs = toHexs(charCode);
            if (unis.length > hexs.length) { unis = hexs; }
        }
        chars[char] = unis;
        return unis;
    }
function toStr(str){
	var s = "";
        for (var i=0;i<str.length;i++) {
            s += (i>0) ? "+" : "";
            s += toChar(str[i]);
            }
    return s;
    }

module.exports = {
    toStr: toStr,
    toScript: toScript
}