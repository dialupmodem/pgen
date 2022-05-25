const classNameTemplate = (pocoModel) => {
  let className = pocoModel.formattedName
  if (pocoModel.options.useBaseClass) {
    className = `${className} : ${pocoModel.options.baseClassName}`
  }
  return className
}

const propertyTemplate = (jsonPropertyModel) => {
  return `  public ${jsonPropertyModel.targetType}? ${jsonPropertyModel.formattedPropertyName} { get; set; }`
}

const templates = {
  class: (pocoModel) => {
    let properties = pocoModel.jsonProperties
    let propertyTemplateFunction = propertyTemplate
    let className = classNameTemplate(pocoModel)

    let generatedClass = `public ${className} {\n`
    generatedClass += `${properties?.map(p => { return `  ${propertyTemplateFunction(p)}\n` }).join('')}`
    generatedClass += '}'

    return generatedClass
  },
}

export default templates