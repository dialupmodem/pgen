
export default class JsonPropertyModel {
  constructor(property, options) {
    Object.assign(this, property)

    this.propertyType = typeof (this.propertyValue)
    this.options = options
    this.targetType = options.userOptions.defaultComplexType
    this.json = this.options.userJson

    this._processReplacements()
  }

  _processReplacements() {
    let nameReplacementOptions = this.options.userOptions.keyValue
      .filter(o => o.target == 'name')

    if (nameReplacementOptions) {
      let nameResult = this.propertyName

      nameReplacementOptions.forEach(r => {
        if (r.isComplex) {
          nameResult = r.replaceTarget(nameResult, this)
        }
        else {
          nameResult = r.replaceTarget(nameResult)
        }
      })

      this.formattedPropertyName = nameResult
    }

    let typeReplacementOptions = this.options.userOptions.keyValue
      .filter(o => o.target == 'type')

    if (typeReplacementOptions) {
      let typeResult = this.propertyType

      typeReplacementOptions.forEach(r => {
        if (r.isComplex) {
          typeResult = r.replaceTarget(typeResult, this)

          if (this.propertyType == 'object' && typeResult != 'object') {
            let resultPattern = new RegExp(`(${typeResult})`)
            typeResult = typeResult.replace(resultPattern, this.options.userOptions.complexPropertyTemplate)
          }
        }
        else {
          typeResult = r.replaceTarget(typeResult)
        }
      })

      if (typeResult) {
        this.targetType = typeResult
      }
    }
  }
  get isRenamed() {
    return this.formattedPropertyName != this.propertyName
  }
}