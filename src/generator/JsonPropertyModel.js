import replacements from './replacements'

export default class JsonPropertyModel {
  constructor(property, options) {
    Object.assign(this, property)

    this.propertyType = typeof(this.propertyValue)
    this.options = options

    this._setFormattedName()
    this._setTargetType()
  }
  _setFormattedName() {
    this.formattedPropertyName = this.propertyName

    replacements.name.forEach(n => {
      if (this.propertyName.match(n.pattern)) {
        this.formattedPropertyName = this.formattedPropertyName.replace(n.pattern, n.replacement)
      }
    })
  }
  _setTargetType() {
    this.targetType = this.options.defaultType

    replacements.type.forEach(t => {
      if (this.propertyType.match(t.pattern)) {
        this.targetType = this.targetType.replace(t.pattern, t.replacement)
      }
    })
  }
}