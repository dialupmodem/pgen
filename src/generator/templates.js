const classNameTemplate = (pocoModel) => {
  let className = pocoModel.className
  if (pocoModel.options.userOptions.useBaseClass) {
    className = `${className} : ${pocoModel.options.userOptions.baseClass}`
  }
  return className
}

const propertyTemplate = (jsonPropertyModel) => {
  return `  public ${jsonPropertyModel.targetType}? ${jsonPropertyModel.formattedPropertyName} { get; set; }`
}

const templates = {
  class: (pocoModel) => {
    let properties = pocoModel.jsonProperties
    if (properties)
      properties = properties.filter(p => p.formattedPropertyName != 'null')
    
    let propertyTemplateFunction = propertyTemplate
    let className = classNameTemplate(pocoModel)

    let generatedClass = `public class ${className} {\n`
    generatedClass += `${properties?.map(p => { return `  ${propertyTemplateFunction(p)}\n` }).join('')}`
    generatedClass += '}'

    return generatedClass
  },
}

export default templates