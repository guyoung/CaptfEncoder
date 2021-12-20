Rail-fence cipher（栅栏密码）
=============================

栅栏密码就是把要加密的明文分成N个一组，然后把每组的第1个字符组合，每组第2个字符组合...每组的第N(最后一个分组可能不足N个)个字符组合，最后把他们全部连接起来就是密文，这里以2栏栅栏加密为例。

明文： The quick brown fox jumps over the lazy dog

去空格： Thequickbrownfoxjumpsoverthelazydog

分组： Th eq ui ck br ow nf ox ju mp so ve rt he la zy do g

第一组： Teucbonojmsvrhlzdg

第二组： hqikrwfxupoeteayo

密文： Teucbonojmsvrhlzdghqikrwfxupoeteayo


## Reference 

 * <http://www.practicalcryptography.com/ciphers/classical-era/rail-fence/>
 * <https://gist.github.com/sergiks/adc4cc0914236ca30c76e14ba4772427>