import { generatorId } from '../utils/generatorId.js';

export default class Tag {
  constructor(name) {
    this.name = name;
    this.id = generatorId();
  }
}
