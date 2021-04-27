'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadWords = require('./loadWords');

var _loadWords2 = _interopRequireDefault(_loadWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWordsList(language, count) {
  const words = (0, _loadWords2.default)();

  return words[language].slice(0, count);
}

exports.default = getWordsList;