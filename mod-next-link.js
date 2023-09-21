/**
 * This replaces every occurrence of variable "foo".
 */
export default function transformer(file, { jscodeshift: j }, options) {
  const source = j(file.source);


 const newImport = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier('NextLink'))],
    j.stringLiteral('next/link'),
  );

  // Insert it at the top of the document
  source.get().node.program.body.unshift(newImport);

  source.findJSXElements('Scoobydoo').forEach(element => {
    // Get the href prop from the original element
    const href = element.value.openingElement.attributes.find(
      attr => attr.name.name === 'href',
    )?.value;

    // Create a new JSXElement called "Tooltip" and use the original Avatar component as children
    const wrapped = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier('NextLink'), [
        // Create a prop on the tooltip so it works as expected
        j.jsxAttribute(
          j.jsxIdentifier('href'),
          (href ?? j.stringLiteral('TODO: no href')),
        ),
      ]),
      j.jsxClosingElement(j.jsxIdentifier('NextLink')),
      [element.value], // Pass in the original component as children
    );

    j(element).replaceWith(wrapped);
  });

  source
    .findJSXElements('Scoobydoo') // Find all JSXElements called "a"
    .find(j.JSXAttribute) // Find all attributes (props) on the button
    .filter(path => path.node.name.name === 'href') // Filter to only props called onClick
    .remove(); // Remove everything that matched

  return source.toSource();
}

export const parser = 'tsx';
