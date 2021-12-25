import { NgModule } from "@angular/core";

import { HashEncoderModule, HashEncoderComponent } from './hash-encoder/index'

import { MDEncoderModule, MDEncoderComponent } from './md-encoder/index'
import { SHAEncoderModule, SHAEncoderComponent } from './sha-encoder/index'
import { HMACEncoderModule, HMACEncoderComponent } from './hmac-encoder/index'
import { BcryptEncoderModule, BcryptEncoderComponent } from './bcrypt-encoder/index'
import { ScryptEncoderModule, ScryptEncoderComponent } from './scrypt-encoder/index'

import { AESEncoderModule, AESEncoderComponent } from './aes-encoder/index'
import { RSAEncoderModule, RSAEncoderComponent } from './rsa-encoder/index'

import { DESEncoderModule, DESEncoderComponent } from './des-encoder/index'
import { TripleDESEncoderModule, TripleDESEncoderComponent } from './triple-des-encoder/index'
import { RabbitEncoderModule, RabbitEncoderComponent } from './rabbit-encoder/index'
import { RC2EncoderModule, RC2EncoderComponent } from './rc2-encoder/index'
import { RC4EncoderModule, RC4EncoderComponent } from './rc4-encoder/index'

import { BlowfishEncoderModule, BlowfishEncoderComponent } from './blowfish-encoder/index'
import { SM3EncoderModule, SM3EncoderComponent } from './sm3-encoder/index'


@NgModule({
    imports: [
        HashEncoderModule,
        MDEncoderModule,
        SHAEncoderModule,
        HMACEncoderModule,
        BcryptEncoderModule,
        ScryptEncoderModule,

        AESEncoderModule,
        RSAEncoderModule,
        DESEncoderModule,
        TripleDESEncoderModule,
        RabbitEncoderModule,
        RC2EncoderModule,
        RC4EncoderModule,
        BlowfishEncoderModule,
        
        SM3EncoderModule,
    ],
    exports: []
  })
  export class CryptoModule {}


export var encoders: any[] = [
    {
        name: 'hash-encoder',
        label: 'Hash',
        tab: 'Hash',
        component: HashEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'md5-encoder',
        label: 'MD5（MD2、MD4、RIPEMD)',
        tab: 'MD5',
        component: MDEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'sha-encoder',
        label: 'SHA（SHA1、SHA256...）',
        tab: 'SHA',
        component: SHAEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'hmac-encoder',
        label: 'HMAC',
        tab: 'HMAC',
        component: HMACEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'bcrypt-encoder',
        label: 'Bcrypt',
        tab: 'Bcrypt',
        component: BcryptEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'scrypt-encoder',
        label: 'Scrypt',
        tab: 'Scrypt',
        component: ScryptEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },


    
    {
        name: 'aes-encoder',
        label: 'AES',
        tab: 'AES',
        component: AESEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'rsa-encoder',
        label: 'RSA',
        tab: 'RSA',
        component: RSAEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'des-encoder',
        label: 'DES',
        tab: 'DES',
        component: DESEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'triple-des-encoder',
        label: '3DES（TripleDES）',
        tab: '3DES',
        component: TripleDESEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'rc2-encoder',
        label: 'RC2',
        tab: 'RC2',
        component: RC2EncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'rc4-encoder',
        label: 'RC4',
        tab: 'RC4',
        component: RC4EncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'rabbit-encoder',
        label: 'Rabbit',
        tab: 'Rabbit',
        component: RabbitEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'blowfish-encoder',
        label: 'Blowfish',
        tab: 'Blowfish',
        component: BlowfishEncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'sm3-encoder',
        label: '国密 SM3',
        tab: 'SM3',
        component: SM3EncoderComponent,
        catalog: 'crypto',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    
]