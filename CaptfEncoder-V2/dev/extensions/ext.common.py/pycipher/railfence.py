'''
implements Railfence cipher
Author: James Lyons
Created: 2014-02-10
'''
from pycipher.base import Cipher

####################################################################################
class Railfence(Cipher):
    """The Railfence Cipher has a single number that forms the key.
    For more info on the Railfence cipher see http://www.practicalcryptography.com/ciphers/rail-fence-cipher/ .
    
    :param key: an integer, must be greater than zero.
    """   
    
    def __init__(self,key=5):
        self.key = key
        assert 0 < self.key, 'invalid key: key='+str(key)+', must be greater than zero'

    def encipher(self,string,keep_punct=False):
        """Encipher string using Railfence cipher according to initialised key.

        Example::
        
            ciphertext = Railfence(3).encipher(plaintext)     

        :param string: The string to encipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The enciphered string.
        """        
        if not keep_punct: string = self.remove_punctuation(string)
        return ''.join(self.buildfence(string, self.key)) 

    def decipher(self,string,keep_punct=False):
        """Decipher string using Railfence cipher according to initialised key.

        Example::
        
            plaintext = Railfence(3).decipher(ciphertext)     

        :param string: The string to decipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The deciphered string.
        """        
        if not keep_punct: string = self.remove_punctuation(string)    
        ind = range(len(string))
        pos = self.buildfence(ind, self.key)
        return ''.join(string[pos.index(i)] for i in ind)

    def buildfence(self,chars, numrails):
        fence = [[None] * len(chars) for n in range(numrails)]
        rails = list(range(numrails - 1)) + list(range(numrails - 1, 0, -1))
        for n, x in enumerate(chars):
            fence[rails[n % len(rails)]][n] = x
        return [c for rail in fence for c in rail if c is not None]
         
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
