import JsonPropertyModel from './JsonPropertyModel'

export default class PocoModel {
  constructor(className, options) {
    this.className = className
    this.json = JSON.parse(options.userJson)
    this.options = options

    this._setName()
    this._setProperties()
  }
  get jsonProperties() {
    if (!this._jsonProperties) {
      return null
    }

    return this._jsonProperties.filter(p => p.targetType != 'null')
  }
  _setName() {
    this.formattedName = this.options.className
  }
  _setProperties() {
    if (this.json) {
      this._jsonProperties = []
      this._jsonProperties = Object.keys(this.json)
        .map(k => ({ propertyName: k, propertyValue: this.json[k] }))
        .map(p => new JsonPropertyModel(p, this.options))

    }
  }
}