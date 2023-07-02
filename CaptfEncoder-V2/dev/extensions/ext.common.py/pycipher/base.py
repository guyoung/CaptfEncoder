'''
base cipher object that other ciphers extend
really only provides mappings a2i and i2a for letter->int->letter conversions
Author: James Lyons
Created: 2012-04-28
'''
import re

class Cipher(object):
    def encipher(self,string):
        return string
        
    def decipher(self,string):
        return string
        
    def a2i(self,ch):
        ch = ch.upper()
        arr = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,'K':10,
           'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,'U':20,
           'V':21,'W':22,'X':23,'Y':24,'Z':25}
        return arr[ch]

    def i2a(self,i):
        i = i%26
        arr = ('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z')
        return arr[i]
        
    def remove_punctuation(self,text,filter='[^A-Z]'):
        return re.sub(filter,'',text.upper())
