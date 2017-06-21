'use strict';

var Mock = require('mockjs');
module.exports = function () {
  return {
    'data|1-10': [
      {
        'tid': Mock.mock('@id'),
        'title': Mock.mock('@csentence(3, 5)'),
        'thumbnail': 'adv.jpg',
        'advertiser': Mock.mock('@cname'),
        'read_profit|1-100': 100,
        'type': '0',
        'status|0-1': '1',
        'created': Mock.mock('@date')
      }
    ]
  };
};