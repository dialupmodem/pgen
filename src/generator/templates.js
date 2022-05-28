const classNameTemplate = (pocoModel) => {
  let className = pocoModel.className
  if (pocoModel.options.userOptions.useBaseClass) {
    className = `${className} : ${pocoModel.options.userOptions.baseClass}`
  }
  return className
}

const propertyTemplate = (jsonPropertyModel) => {
  let name = jsonPropertyModel.formattedPropertyName
  let type = jsonPropertyModel.targetType
  let userOptions = jsonPropertyModel.options.userOptions

  if (userOptions.useNullableTypes) {
    type = `${type}?`
  }

  let propertyTemplate = `\tpublic ${type} ${name} { get; set; }`

  if (userOptions.attributeMode != 'none') {
      let attributePattern = userOptions.attributeTemplate
      let propertyNamePattern = new RegExp(`(${jsonPropertyModel.propertyName})`)
      let attribute = jsonPropertyModel.propertyName.replace(propertyNamePattern, attributePattern)

      let useAttribute = (userOptions.attributeMode == 'onlyRenamed' && 
        jsonPropertyModel.isRenamed) || userOptions.attributeMode == 'all'

    if (useAttribute) {
      propertyTemplate = `\t${attribute}\r\n${propertyTemplate}\r\n`
    }
  }
  return propertyTemplate
}



const templates = {
  class: (pocoModel) => {
    let properties = pocoModel.jsonProperties
    if (properties)
      properties = properties.filter(p => p.formattedPropertyName != 'null')

    let propertyTemplateFunction = propertyTemplate
    let className = classNameTemplate(pocoModel)

    let generatedClass = `public class ${className} {\n`
    generatedClass += `${properties?.map(p => {
      return `  ${propertyTemplateFunction(p)}\n`
    }).join('')}`
    generatedClass += '}'

    return generatedClass
  },
}

export default templates