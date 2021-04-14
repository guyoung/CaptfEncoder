'''
implements bifid cipher
Author: James Lyons 
Created: 2012-04-28
'''
from pycipher.base import Cipher
from pycipher.polybius import PolybiusSquare
####################################################################################
class Bifid(Cipher):
    """The Bifid Cipher is a fractionating cipher, and has a key consisting of a 25 letter keysquare (with a letter removed e.g. 'J'), along with
    a 'period', which is an integer.
    For more information, the algorithm can be 
    seen e.g. http://www.practicalcryptography.com/ciphers/bifid-cipher/
    
    :param key: The keysquare, as a 25 character string.    
    :param period: an integer.
    """
    def __init__(self,key='phqgmeaylnofdxkrcvszwbuti',period=5):
        self.key = [k.upper() for k in key]
        self.pb = PolybiusSquare(self.key,size=5)
        self.period = period
        assert len(key)==25, 'invalid key in init: must have length 25, has length '+str(len(key))
        assert period>=1, 'invalid period in init: period should be >= 1'

    def encipher(self,string):
        """Encipher string using Bifid cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = Bifid('phqgmeaylnofdxkrcvszwbuti',5).encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """                
        string = self.remove_punctuation(string)
        step1 = self.pb.encipher(string)
        evens = step1[::2]
        odds = step1[1::2]
        step2 = []
        for i in range(0,len(string),self.period):
            step2 += evens[i:int(i+self.period)]
            step2 += odds[i:int(i+self.period)]
        return self.pb.decipher(''.join(step2))

    def decipher(self,string):
        """Decipher string using Bifid cipher according to initialised key. Punctuation and whitespace
        are removed from the input.

        Example::

            plaintext = Bifid('phqgmeaylnofdxkrcvszwbuti',5).decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """       
        ret = ''
        string = string.upper()
        rowseq,colseq = [],[]
        # take blocks of length period, reform rowseq,colseq from them
        for i in range(0,len(string),self.period):
            tempseq = []
            for j in range(0,self.period):
                if i+j >= len(string): continue
                tempseq.append(int(self.key.index(string[i + j]) / 5))
                tempseq.append(int(self.key.index(string[i + j]) % 5))
            rowseq.extend(tempseq[0:int(len(tempseq)/2)])
            colseq.extend(tempseq[int(len(tempseq)/2):])
        for i in range(len(rowseq)):
            ret += self.key[rowseq[i]*5 + colseq[i]]
        return ret

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')