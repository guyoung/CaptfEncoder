import { Injectable } from '@angular/core';



@Injectable()
export class EncoderManager {

    getEncoders() { 
        var encoders = [];
        encoders = encoders.concat(
            require('./../../encoders/converter/contents/').encoders,
            require('./../../encoders/classical/contents/').encoders,
            require('./../../encoders/crypto/contents/').encoders,
            require('./../../encoders/other/contents/').encoders,
            require('./../../encoders/program/contents/').encoders,
            require('./../../encoders/utility/contents/').encoders,  
            require('./../../encoders/aggregation/contents/').encoders);     
        return encoders;              
    }

    getCatalogs() {
        return [
            {
                id: 'converter',
                name: 'converter',
                label: '编码转换'
            },
            {
                id: 'classical',
                name: 'classical',
                label: '古典密码'
            },
            {
                id: 'crypto',
                name: 'crypto',
                label: '密码学'
            },  
            {
                id: 'other',
                name: 'other',
                label: '其他编码'
            },
            /*
            {
                id: 'program',
                name: 'program',
                label: '程序代码'
            },
            */
            {
                id: 'utility',
                name: 'utility',
                label: '实用工具'
            },
            {
                id: 'aggregation',
                name: 'aggregation',
                label: '聚合工具'
            },
        ]
    }

}