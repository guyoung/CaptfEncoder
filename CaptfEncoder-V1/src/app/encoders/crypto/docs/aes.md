AES
====================


高级加密标准（Advanced Encryption Standard: AES）是美国国家标准与技术研究院（NIST）在2001年建立了电子数据的加密规范。它是一种分组加密标准，每个加密块大小为128位，允许的密钥长度为128、192和256位。

 分组密码有五种工作体制：1. 电码本模式（Electronic Codebook Book (ECB)）；2.密码分组链接模式（Cipher Block Chaining (CBC)）；3.计算器模式（Counter (CTR)）；4.密码反馈模式（Cipher FeedBack (CFB)）；5.输出反馈模式（Output FeedBack (OFB)）。 


ECB模式（电子密码本模式：Electronic codebook）

ECB是最简单的块密码加密模式，加密前根据加密块大小（如AES为128位）分成若干块，之后将每块使用相同的密钥单独加密，解密同理。

ECB模式由于每块数据的加密是独立的因此加密和解密都可以并行计算，ECB模式最大的缺点是相同的明文块会被加密成相同的密文块，这种方法在某些环境下不能提供严格的数据保密性


CBC模式（密码分组链接：Cipher-block chaining）

CBC模式对于每个待加密的密码块在加密前会先与前一个密码块的密文异或然后再用加密器加密。第一个明文块与一个叫初始化向量的数据块异或。

CBC模式相比ECB有更高的保密性，但由于对每个数据块的加密依赖与前一个数据块的加密所以加密无法并行。与ECB一样在加密前需要对数据进行填充，不是很适合对流数据进行加密。

CFB模式(密文反馈:Cipher feedback)

与ECB和CBC模式只能够加密块数据不同，CFB能够将块密文（Block Cipher）转换为流密文（Stream Cipher）。

OFB模式（输出反馈：Output feedback）

OFB是先用块加密器生成密钥流（Keystream），然后再将密钥流与明文流异或得到密文流，解密是先用块加密器生成密钥流，再将密钥流与密文流异或得到明文，由于异或操作的对称性所以加密和解密的流程是完全一样的。


计算器模式（Counter (CTR)）

计算器模式不常见，在CTR模式中， 有一个自增的算子，这个算子用密钥加密之后的输出和明文异或的结果得到密文，相当于一次一密。这种加密方式简单快速，安全可靠，而且可以并行加密，但是 在计算器不能维持很长的情况下，密钥只能使用一次 。



## Reference 

 * <https://www.tuicool.com/articles/AZZjiu>
 * <https://blog.csdn.net/charleslei/article/details/48710293>
 * <https://blog.zhengxianjun.com/2015/05/javascript-crypto-js/>
 * <http://jser.io/2014/08/19/how-to-use-aes-in-crypto-js-to-encrypt-and-decrypt>
