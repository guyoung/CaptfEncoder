Baconian Cipher（培根密码）
=======================================

培根密码(Baconian Cipher)是一种替换密码，每个明文字母被一个由5字符组成的序列替换，最初的加密方式就是由'A'和'B'组成序列替换明文(所以你当然也可以用别的字母)，比如字母'D'替换成"aaabb"，以下是全部的对应关系(另一种对于关系是每个字母都有唯一对应序列，I和J与U/V各自都有不同对应序列)：


A = aaaaa  I/J = abaaa  R = baaaa

B = aaaab  K = abaab    S = baaab

C = aaaba  L = ababa    T = baaba

D = aaabb  M = ababb    U/V = baabb

E = aabaa  N = abbaa    W = babaa

F = aabab  O = abbab    X = babab

G = aabba  P = abbba    Y = babba

H = aabbb  Q = abbbb    Z = babbb

明文： T H E F O X

密文： baaba aabbb aabaa aabab abbab babab


## Reference 

 * <https://github.com/mathiasbynens/bacon-cipher>