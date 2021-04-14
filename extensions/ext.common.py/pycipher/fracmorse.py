'''
implements fractionated morse cipher
Author: James Lyons
Created: 2014-01-26
'''
from pycipher.base import Cipher
import re
import sys
####################################################################################
class FracMorse(Cipher):
    """The Fractionated Morse Cipher has a 26 letter key, similar to that of a substitution cipher.
    This cipher first converts the plaintext to morse code, then converts fixed-length chunks
    of morse code back to ciphertext letters
    """
    def __init__(self,key='ROUNDTABLECFGHIJKMPQSVWXYZ'):
        self.key = [k.upper() for k in key]
        assert len(key)==26

    table = ['...', '..-', '..x', '.-.', '.--', '.-x', '.x.', '.x-', '.xx', '-..', '-.-', '-.x', '--.', '---', '--x', '-x.', '-x-','-xx', 'x..', 'x.-', 'x.x', 'x-.', 'x--', 'x-x', 'xx.', 'xx-']
        
    def encipher(self,string):
        """Encipher string using FracMorse cipher according to initialised key. 

        Example::

            ciphertext = FracMorse('ROUNDTABLECFGHIJKMPQSVWXYZ').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """           
        string = string.upper()
        #print string
        morsestr = self.enmorse(string)
         # make sure the morse string is a multiple of 3 in length
        if len(morsestr) % 3 == 1:
            morsestr = morsestr[0:-1]
        elif len(morsestr) % 3 == 2:
            morsestr = morsestr + 'x'
        #print morsestr
        mapping = dict(zip(self.table,self.key))
        ctext = ""
        for i in range(0,len(morsestr),3):
            ctext += mapping[morsestr[i:i+3]]
        return ctext    

    def decipher(self,string):
        """Decipher string using FracMorse cipher according to initialised key. 

        Example::

            plaintext = FracMorse('ROUNDTABLECFGHIJKMPQSVWXYZ').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The enciphered string.
        """                   
        string = string.upper()
        mapping = dict(zip(self.key,self.table))
        ptext = ""
        for i in string:
            ptext += mapping[i]
        return self.demorse(ptext)    

    morsetab= {' ': '', '(': '-.--.-', ',': '--..--', '.': '.-.-.-', '0': '-----', '2': '..---', '4': '....-', '6': '-....', '8': '---..', ':': '---...', 'B': '-...', 'D': '-..', 'F': '..-.', 'H': '....', 'J': '.---', 'L': '.-..', 'N': '-.', 'P': '.--.', 'R': '.-.', 'T': '-', 'V': '...-', 'X': '-..-', 'Z': '--..', "'": '.----.', ')': '-.--.-', '-': '-....-', '/': '-..-.', '1': '.----', '3': '...--', '5': '.....', '7': '--...', '9': '----.', ';': '-.-.-.', '?': '..--..', 'A': '.-', 'C': '-.-.', 'E': '.', 'G': '--.', 'I': '..', 'K': '-.-', 'M': '--', 'O': '---', 'Q': '--.-', 'S': '...', 'U': '..-', 'W': '.--', 'Y': '-.--', '_': '..--.-'}
    
    invmorse={'': ' ', '..--.-': '_', '...--': '3', '--..--': ',', '....-': '4', '.....': '5', '-...': 'B', '-..-': 'X', '.-.': 'R','--.-': 'Q', '--..': 'Z', '.': 'E', '.----.': "'", '..---': '2', '.--': 'W', '.-': 'A', '..': 'I', '-.-.': 'C', '---...': ':', '---': 'O', '-.--': 'Y', '-': 'T', '-..-.': '/', '.-..': 'L', '--.': 'G', '...': 'S', '-.--.-': ')', '..--..': '?', '.----': '1', '-----': '0', '-.-': 'K', '-..': 'D', '----.': '9', '-....': '6', '.---': 'J', '.--.': 'P', '.-.-.-': '.', '--': 'M', '-.': 'N', '....': 'H', '---..': '8', '...-': 'V', '--...': '7', '-.-.-.': ';', '..-': 'U', '..-.': 'F','-....-': '-'}
    
    # converts plaintext to morse code with 'x's between chars and 'xx' between words
    def enmorse(self,string):
        string = re.sub("[^ (,.02468:BDFHJLNPRTVXZ')\-/13579;?ACEGIKMOQSUWY_]",'',string)
        string = re.sub("  *",' ',string) # replace any double spaces with a single space
        string = re.sub(" *$",'',string) # make sure no spaces on the end
        ret = ""
        for c in string:
            ret += self.morsetab[c] + 'x'
        return ret    
    
    # converts the morse output of enmorse back to text
    def demorse(self,string):
        c = 0
        ret = ""
        if string[-1] != 'x': string = string + 'x'
        while c < len(string):
            letter = ''
            while string[c] != 'x':
                letter += string[c]
                c+=1
            if letter not in self.invmorse: ret+='Q'
            else: ret+= self.invmorse[letter]
            c+=1
        return ret

    
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
