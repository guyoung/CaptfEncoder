'''
implements Foursquare cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class Foursquare(Cipher):
    """The Foursquare Cipher enciphers pairs of characters, the key consists of 2 keysquares, each 25 characters in length.
    More information about the algorithm can be 
    found at http://www.practicalcryptography.com/ciphers/four-square-cipher/.
    
    :param key1: The first keysquare, as a 25 character string.
    :param key2: The second keysquare, as a 25 character string.
    """
    def __init__(self,key1='zgptfoihmuwdrcnykeqaxvsbl',key2='mfnbdcrhsaxyogvituewlqzkp'):
        self.key1 = [k.upper() for k in key1]
        self.key2 = [k.upper() for k in key2]
        self.alph = 'ABCDEFGHIKLMNOPQRSTUVWXYZ' # no letter j
        assert len(self.key1)==25, 'key1 is not length 25'
        assert len(self.key2)==25, 'key2 is not length 25'
        
    def encipher_pair(self,a,b):
        arow,acol = self.alph.index(a)/5, self.alph.index(a)%5
        brow,bcol = self.alph.index(b)/5, self.alph.index(b)%5
        return (self.key1[arow*5+bcol], self.key2[brow*5+acol])
        
    def decipher_pair(self,a,b):
        arow,acol = self.key1.index(a)/5, self.key1.index(a)%5
        brow,bcol = self.key2.index(b)/5, self.key2.index(b)%5
        return (self.alph[arow*5+bcol], self.alph[brow*5+acol])
        
    def encipher(self,string):
        """Encipher string using Foursquare cipher according to initialised key. Punctuation and whitespace
        are removed from the input. If the input plaintext is not an even number of characters, an 'X' will be appended.

        Example::

            ciphertext = Foursquare(key1='zgptfoihmuwdrcnykeqaxvsbl',key2='mfnbdcrhsaxyogvituewlqzkp').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """                
        string = self.remove_punctuation(string)  
        if len(string)%2 == 1: string = string + 'X'
        ret = ''
        for c in range(0,len(string.upper()),2):
            a,b = self.encipher_pair(string[c],string[c+1])
            ret += a + b
        return ret    

    def decipher(self,string):
        """Decipher string using Foursquare cipher according to initialised key. Punctuation and whitespace
        are removed from the input. The ciphertext should be an even number of characters. If the input ciphertext is not an even number of characters, an 'X' will be appended.

        Example::

            plaintext = Foursquare(key1='zgptfoihmuwdrcnykeqaxvsbl',key2='mfnbdcrhsaxyogvituewlqzkp').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """              
        string = self.remove_punctuation(string)  
        if len(string)%2 == 1: string = string + 'X'
        ret = ''
        for c in range(0,len(string.upper()),2):
            a,b = self.decipher_pair(string[c],string[c+1])
            ret += a + b
        return ret    
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')