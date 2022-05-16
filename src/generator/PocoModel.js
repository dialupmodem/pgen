import JsonPropertyModel from './JsonPropertyModel'

export default class PocoModel {
  constructor(className, json, options) {
    this.className = className
    this.json = JSON.parse(json)
    this.options = options
    
    this._setName()
    this._setProperties()
  }
  _setName() {
    this.formattedName = this.options.defaultClassName
  }
  _setProperties() {
    this.jsonProperties = []
    this.jsonProperties = Object.keys(this.json)
      .map(k => ({ propertyName: k, propertyValue: this.json[k] }))
      .map(p => new JsonPropertyModel(p, this.options))
  }
}