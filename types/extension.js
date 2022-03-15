'use strict';

const Actor = require('@fabric/core/types/actor');

class Extension extends Actor {
  constructor (settings = {}) {
    super(settings);
    this.settings = Object.assign({}, settings);
    return this;
  }
}

module.exports = Extension;