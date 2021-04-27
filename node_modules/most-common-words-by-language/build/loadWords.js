'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let words;

const extension = '.txt';
const dirname = `${__dirname}/resources`;

function loadWords() {
  if (!words) {
    const names = _fs2.default.readdirSync(dirname).map(filename => _path2.default.basename(filename, extension));
    words = _lodash2.default.zipObject(names, names.map(name => _fs2.default.readFileSync(`${dirname}/${name}${extension}`).toString().split('\n').filter(x => x)));
  }

  return words;
}

exports.default = loadWords;