import type { NodePath } from '@babel/core';
import { arrowFunctionExpression, cloneNode } from '@babel/types';
import type {
  ArrowFunctionExpression,
  Expression,
  Identifier,
  ObjectExpression,
  PrivateName,
} from '@babel/types';
import { findIdentifiers } from '@linaria/utils';
import { isStaticObjectOrArrayExpression } from './checkStaticObjectOrArray';

function validateObjectKey(
  keyPath: NodePath<PrivateName | Expression>,
  parentCall?: NodePath<ArrowFunctionExpression>,
) {
  const rootScope = keyPath.scope.getProgramParent();
  if (keyPath.isIdentifier()) {
    return;
  }
  const identifiers = findIdentifiers([keyPath]);
  if (!identifiers.length) {
    return;
  }
  if (!parentCall) {
    throw keyPath.buildCodeFrameError(
      'Expressions in css object keys are not supported.',
    );
  }
  if (
    !identifiers.every((item) => {
      const binding = item.scope.getBinding(item.node.name);
      if (!binding) {
        return false;
      }
      if (
        binding.path.findParent((parent) => parent === parentCall) ||
        binding.path.scope === rootScope
      ) {
        return true;
      }
      return false;
    })
  ) {
    throw keyPath.buildCodeFrameError(
      'Variables in css object keys should only use the passed theme(s) object or variables that are defined in the root scope.',
    );
  }
}

function traverseObjectExpression(
  nodePath: NodePath<ObjectExpression>,
  parentCall?: NodePath<ArrowFunctionExpression>,
) {
  const rootScope = nodePath.scope.getProgramParent();
  const properties = nodePath.get('properties');
  properties.forEach((property) => {
    if (property.isObjectProperty()) {
      validateObjectKey(property.get('key'), parentCall);

      const value = property.get('value');
      if (!value.isExpression()) {
        throw value.buildCodeFrameError(
          'This value is not supported. It can only be static values or local variables.',
        );
      }
      if (value.isObjectExpression()) {
        traverseObjectExpression(value, parentCall);
      } else if (value.isArrowFunctionExpression()) {
        throw value.buildCodeFrameError(
          'Arrow functions are not supported as values of sx object.',
        );
      } else if (
        !value.isLiteral() &&
        !isStaticObjectOrArrayExpression(value)
      ) {
        const identifiers = findIdentifiers([value], 'referenced');
        const themeIdentifiers: NodePath<Identifier>[] = [];
        const localIdentifiers: NodePath<Identifier>[] = [];
        identifiers.forEach((id) => {
          if (!id.isIdentifier()) {
            return;
          }
          const binding = id.scope.getBinding(id.node.name);
          if (!binding) {
            return;
          }
          if (binding.path.findParent((parent) => parent === parentCall)) {
            themeIdentifiers.push(id);
          } else if (binding.scope !== rootScope) {
            localIdentifiers.push(id);
          } else {
            throw id.buildCodeFrameError(
              'Consider moving this variable to the root scope if it has all static values.',
            );
          }
        });
        if (localIdentifiers.length) {
          const arrowFn = arrowFunctionExpression(
            localIdentifiers.map((i) => i.node),
            cloneNode(value.node),
          );
          value.replaceWith(arrowFn);
        }
      }
    } else if (property.isSpreadElement()) {
      const identifiers = findIdentifiers([property.get('argument')]);
      if (
        !identifiers.every((id) => {
          const binding = property.scope.getBinding(id.node.name);
          if (!binding || binding.scope !== rootScope) {
            return false;
          }
          return true;
        })
      ) {
        throw property.buildCodeFrameError(
          'You can only use variables that are defined in the root scope of the file.',
        );
      }
    } else if (property.isObjectMethod()) {
      throw property.buildCodeFrameError(
        'sx prop object does not support ObjectMethods.',
      );
    } else {
      throw property.buildCodeFrameError('Unknown property in object.');
    }
  });
}

export function sxObjectExtractor(
  nodePath: NodePath<ObjectExpression | ArrowFunctionExpression>,
) {
  if (nodePath.isObjectExpression()) {
    traverseObjectExpression(nodePath);
  } else if (nodePath.isArrowFunctionExpression()) {
    const body = nodePath.get('body');
    if (!body.isObjectExpression()) {
      throw body.buildCodeFrameError(
        "sx prop only supports arrow functions that directly return an object, e.g. () => ({color: 'red'}). You can accept theme object in the params if required.",
      );
    }
    traverseObjectExpression(body, nodePath);
  }
}
