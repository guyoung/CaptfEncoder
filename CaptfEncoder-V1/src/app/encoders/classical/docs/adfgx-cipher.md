ADFGX Cipher（ADFGX 密码）
=======================================


ADFGX密码(ADFGX Cipher)是结合了改良过的Polybius方格替代密码与单行换位密码的矩阵加密密码，使用了5个合理的密文字母：A，D，F，G，X，这些字母之所以这样选择是因为当转译成摩尔斯电码(ADFGX密码是德国军队在一战发明使用的密码)不易混淆，目的是尽可能减少转译过程的操作错误。

加密矩阵示例：


    A  D  F  G   X
  ----------------
A | p  h  q  g   m 
D | e  a  y  n   o 
F | f  d  x  k   r
G | c  v  s  z   w 
X | b  u  t  i/j l

明文： THE QUICK BROWN FOX

结果矩阵加密：

XF AD DA   AF XD XG GA FG   XA FX DX GX DG   FA DX FF