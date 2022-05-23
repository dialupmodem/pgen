const templates = {
  className: (pocoModel) => {
    let className = pocoModel.formattedName
    if (pocoModel.options.useBaseClass) {
      className = `${className} : ${pocoModel.options.baseClassName}`
    }
    return className
  },
  class: (pocoModel) => {
    let properties = pocoModel.jsonProperties
    let propertyTemplateFunction = pocoModel.options.templateFunctions.property
    let className = pocoModel.options.templateFunctions.className(pocoModel)

    let propertyTemplate = `public ${className} {\n`
    propertyTemplate += `${properties?.map(p => { return `  ${propertyTemplateFunction(p)}\n` }).join('')}`
    propertyTemplate += '}'

    return propertyTemplate
  },
  property: (jsonPropertyModel) => {
    return `  public ${jsonPropertyModel.targetType}? ${jsonPropertyModel.formattedPropertyName} { get; set; }`
  }
}

export default templates