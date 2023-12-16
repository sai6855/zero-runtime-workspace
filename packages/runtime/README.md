## Features

### Variant styles

To style component based on finite values (e.g. size, color), use `variants` styles.

```js
// Ex. 1
styled('button')({
  variants: [
    {
      // matcher as a plain object
      props: {
        size: 'small',
      },

      // CSS as an object
      style: {
        fontSize: 12,
        '&:hover': {
          transform: 'scale(1.1)',
        }
      }
    }
  ],
})

// Ex. 2, accessing to `theme.vars`
styled('button')(({ theme }) => ({
  variants: [
    {
      props: {...},
      style: {
        fontSize: theme.vars.fontSize,
      }
    }
  ],
}))
```

The `props` of each variant supports callback syntax to create complex matcher with internal state (`ownerState`).

```js
// Ex. 1
styled('button')({
  variants: [
    {
      // matcher as a plain object
      props: (ownerState) => !ownerState.disabled,

      // CSS as an object
      style: {
        background: 'tomato',
      }
    }
  ],
})
```

Each variant style will be created at build time and injected into the component via `className` when the condition matched.

```css
.hashed-component_variant-1 {
  font-size: 12px;
}
.hashed-component_variant-1:hover {
  transform: scale(1.1);
}

.hashed-component_variant-2 {
  background: tomato;
}
```

```js
<button className={clsx(ownerState.size === 'small' && 'hashed-component_variant-1', !ownerState.disabled && 'hashed-component_variant-2')}>
```

::: ⚠️ Warning

`ownerState` cannot be accessed in the root callback.

```js
// ❌ Error
styled('button')(({ ownerState }) => ({
  variants: [
    {
      props: {...},
      style: {
        fontSize: ownerState.fontSize,
      }
    }
  ],
}))
```

:::


### Dynamic styles

To style component based on infinite values (e.g. width, height, ratio), pass callback as a value to the CSS property.

```js
// Ex. 1
styled('button')({
  width: ({ ownerState }) => ownerState.width,
  height: ({ ownerState }) => {
    if (ownerState.height === 'auto') {
      return 300
    }
    return typeof ownerState.height === 'number' ? `${ownerState.height}px` : 0
  },
})
```

The dynamic styles will be transpiled into `vars` object and inject as a prop to the component,

```css
.hashed-component {
  width: var(--hashed-var1);
  height: var(--hashed-var2);
}
```

```js
// internal implementation
<button className="hashed-component" style={{
  '--hashed-var1': ({ ownerState }) => ownerState.width,
  '--hashed-var2': ({ ownerState }) => {
    if (ownerState.height === 'auto') {
      return 300
    }
    return typeof ownerState.height === 'number' ? `${ownerState.height}px` : 0
  },
}}>
```

::: ⚠️ Warning

`theme` cannot be accessed in dynamic styles.

```js
// ❌ Error
styled('button')(({ theme }) => ({
  width: ({ ownerState }) => theme.vars.width,
}))
```

:::