'''
implements enigma cipher
Author: James Lyons 
Created: 2012-04-28
'''
from pycipher.base import Cipher

class Enigma(Cipher):
    ''' The Enigma M3 cipher. The key consists of several parameters.
    
    :param settings: The rotor start positions, consists of 3 characters e.g. ('V','B','Q')
    :param rotors: The rotors and their order e.g. (2,3,1). There are 8 possible rotors.
    :param reflector: The reflector in use, a single character 'A','B' or 'C'
    :param ringstellung: The ring settings, consists of 3 characters e.g. ('V','B','Q')
    :param steckers: The plugboard settings, indicating which characters are replaced by which others. Consists of a 10-tuple of 2-tuples e.g. [('P','O'), ('M','L'), ('I','U'), ('K','J'), ('N','H'), ('Y','T'), ('G','B'), ('V','F'), ('R','E'), ('D','C')]. If fewer plugs are required leave them out e.g. a 5-tuple of 2-tuples would be used if 5 plugs were applied.
    '''
    def __init__(self,settings=('A','A','A'),rotors=(1,2,3),reflector='B',
                 ringstellung=('F','V','N'),steckers=[('P','O'),('M','L'),
                 ('I','U'),('K','J'),('N','H'),('Y','T'),('G','B'),('V','F'),
                 ('R','E'),('D','C')]):
        # Key setting include the following information:
        #    settings=('A','A','A') - The rotor start positions, 
        #        gets updated with each character enciphered
        #    rotors=(1,2,3) - The physical rotors used by the enigma, can be numbers between
        #        1 and 8 (there were 8 total rotors). The order is important.
        #    reflector='B' - The physical reflector used by the enigma, can be a letter A,B,C
        #    ringstellung=('F','V','N') - preset rotor wiring positions
        #    steckers=(('P','O'),('M','L'),('I','U'),('K','J'),('N','H'),
        #              ('Y','T'),('G','B'),('V','F'),('R','E'),('D','C')))
        #              - performs substitutions according to the pairs. Whenever one letter
        #              is found it is replaced by the other letter in the pair. Can have up
        #              to 13 pairs.
        self.initsettings = settings  # remember the starting settings
        self.settings = list(settings) # these settings will be updated each character
        self.rotors = tuple([q-1 for q in rotors])
        self.reflector = self.a2i(reflector)
        self.ringstellung = ringstellung
        self.steckers = steckers
        self.rotorkey =("EKMFLGDQVZNTOWYHXUSPAIBRCJ", # rotor keys
                       "AJDKSIRUXBLHWTMCQGZNPYFVOE",
                       "BDFHJLCPRTXVZNYEIWGAKMUSQO",
                       "ESOVPZJAYQUIRHXLNFTGKDCMWB",
                       "VZBRGITYUPSDNHLXAWMJQOFECK",
                       "JPGVOUMFYQBENHZRDKASXLICTW",
                       "NZJHGRCXMYSWBOUFAIVLPEKQDT",
                       "FKQHTLXOCBJSPDZRAMEWNIUYGV")
        self.invrotor =("UWYGADFPVZBECKMTHXSLRINQOJ", # inverse rotor keys
                       "AJPCZWRLFBDKOTYUQGENHXMIVS",
                       "TAGBPCSDQEUFVNZHYIXJWLRKOM",
                       "HZWVARTNLGUPXQCEJMBSKDYOIF",
                       "QCYLXWENFTZOSMVJUDKGIARPHB",
                       "SKXQLHCNWARVGMEBJPTYFDZUIO",
                       "QMGYVPEDRCWTIANUXFKZOSLHJB",
                       "QJINSAYDVKBFRUHMCPLEWZTGXO")
        self.reflectorkey = ("EJMZALYXVBWFCRQUONTSPIKHGD",
                       "YRUHQSLDPXNGOKMIEBFZCWVJAT",
                       "FVPJIAOYEDRZXWGCTKUQSBNMHL")    
        # notches indicate where the rotors increment. rotors 6-8 have two notches
        self.notch = (('Q',),('E',),('V',),('J',),('Z',),('Z','M'),('Z','M'),('Z','M'))        

    def reset_settings(self):
        # Use to restart rotors at initial position. Useful when deciphering. '''
        self.settings = list(self.initsettings)

    def apply_rotor(self,ch,offset,key):
        # ch - the character to encode
        #    offset - how many times has the rotor been incremented
        #    key - which of the 8 possible rotors is this one ''' 
        ch = self.subst(ch,key,offset)
        return self.subst(ch,offset=-offset)

    def reflect(self,ch):
        # performs the reflector substitution. The reflector choice is part of 
        #the key material. It is represented by an integer 0-2 '''
        return self.subst(ch,self.reflectorkey[self.reflector])
        
    def subst(self,ch,key='ABCDEFGHIJKLMNOPQRSTUVWXYZ',offset=0):
        # substitute a single character according to the key '''
        index = (self.a2i(ch)+offset)%26
        return key[index]

    def apply_steckers(self,ch):
        # steckers is a 13-tuple of 2-tuples representing character substitutions '''
        for i in self.steckers:
            if ch == i[0]: return i[1]
            if ch == i[1]: return i[0]
        return ch     # no substitution need be performed

    def advance_rotor(self):
        # rotors advance the next rotor along depending on their position '''
        if self.settings[1] in self.notch[self.rotors[1]]:
            self.settings[0] = self.subst(self.settings[0],offset=1) # increment the position 1 letter
            self.settings[1] = self.subst(self.settings[1],offset=1)
        if self.settings[2] in self.notch[self.rotors[2]]:
            self.settings[1] = self.subst(self.settings[1],offset=1)
        self.settings[2] = self.subst(self.settings[2],offset=1)

    def encipher_char(self,ch):
        self.advance_rotor()  # the rotor gets advanced before the character is enciphered
        ch = self.apply_steckers(ch)
        for i in [2,1,0]: # go through each of the 3 rotors
            offset = ord(self.settings[i])-ord(self.ringstellung[i])
            ch = self.apply_rotor(ch,offset,self.rotorkey[self.rotors[i]])
        ch = self.reflect(ch)
        for i in [0,1,2]: # go back through the rotors the other way
            offset = ord(self.settings[i])-ord(self.ringstellung[i])
            ch = self.apply_rotor(ch,offset,self.invrotor[self.rotors[i]])
        ch = self.apply_steckers(ch)
        return ch
                
    def decipher(self,string):
        """Decipher string using Enigma M3 cipher according to initialised key. Punctuation and whitespace
        are removed from the input. The encipher and decipher operations of the Enigma are identical.

        Example::

            plaintext = Enigma(settings=('A','A','A'),rotors=(1,2,3),reflector='B',
                 ringstellung=('F','V','N'),steckers=[('P','O'),('M','L'),
                 ('I','U'),('K','J'),('N','H'),('Y','T'),('G','B'),('V','F'),
                 ('R','E'),('D','C')])).decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """       
        # enciphering and deciphering are the same operation. '''
        return self.encipher(string)
                
    def encipher(self,string):
        """Encipher string using Enigma M3 cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = Enigma(settings=('A','A','A'),rotors=(1,2,3),reflector='B',
                 ringstellung=('F','V','N'),steckers=[('P','O'),('M','L'),
                 ('I','U'),('K','J'),('N','H'),('Y','T'),('G','B'),('V','F'),
                 ('R','E'),('D','C')])).encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """       
        string = self.remove_punctuation(string)
        ret = ''
        for c in string.upper():
            if c.isalpha(): ret += self.encipher_char(c)
            else: ret += c
        return ret
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
