/**
 * This replaces every occurrence of variable "foo".
 */
export default function transformer(file, { jscodeshift: j }, options) {
  const source = j(file.source);

  source
    .find(j.JSXElement)
    // Find all components called button
    .filter(path => path.value.openingElement.name.name === 'NextLink')
    .forEach(element => {
      const attrs = element.node.openingElement.attributes 

      if (element.node.openingElement.attributes.find(attr => attr.name.name === 'passHref') === undefined) {
        attrs.push(j.jsxAttribute(j.jsxIdentifier('passHref')))
      }

      if (element.node.openingElement.attributes.find(attr => attr.name.name === 'legacyBehavior') === undefined) {
        attrs.push(j.jsxAttribute(j.jsxIdentifier('legacyBehavior')))
      }
    });

  return source.toSource();
}

export const parser = 'tsx';
