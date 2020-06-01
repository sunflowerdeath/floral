# Floral :cherry_blossom:

Library that helps to use inline styles in React components.
It doesn't convert styles to CSS or implement special features from CSS
like pseudo-classes or media queries.
It just helps to use plain inline styles and provides simple way to extend them.

## Install

```
npm install floral --save
```

## Examples

### Defining styles

```js
import floral from 'floral'

// Define styles for component's elements
const styles = {
    root: {
        display: 'inline-block',
        padding: '10px 5px'
    }
}

// Another option is to define styles with function that takes
// props and other dependencies and returns object with styles.
const styles = (props /*, state1, state2, ... */) => ({
    root: {
        fontSize: props.size === 'big' ? '20px' : '15px'
    }
})

const Button = props => {
    const [isHovered, setIsHovered] = useState(false)
    // Hook that allows to use styles in the component
    const computedStyles = useStyles(styles, [props, isHovered])
    return <div style={computedStyles.root}>{props.children}</div>
})
```

### Using styled components

```js
let bigButton = <Button size="big">Big button</Button>

// Extending styles through props
let redButton = <Button styles={{ root: { color: 'red' } }}>Red</Button>

// Shorthand property for extending styles of the root element
let greenButton = <Button style={{ color: 'green' }}>Green</Button>
```

### Extending styled components

```js
// You can make new component that extends styles of another one
import { extendComponentStyles } from 'floral'

const coloredButtonStyles = props => ({
    root: { background: props.color }
})
    
const ColoredButton2 = extendComponentStyles(Button, coloredButtonStyles)
```

## FAQ

**Why inline styles?**
<br>
Because inline styles provide better isolation, extensibility, and allow to use
full power of Javascript.

**What about performance?**
<br>
Inline styles have some overhead comparing to CSS,
but it is OK for small and medium projects.

**I want to use CSS features like pseudo classes or media queries.**
<br>
All these features can be implemented with Javascript.

## API

### useStyles(styles, [props, ...restDeps])

Hook that allows to use styles in the component.

Styles definition can be an object with styles of component's elements,
or a function that takes props and state and returns such object.

Returns an object with computed styles.

Hook search additional styles definitions in props `styles`, and in the prop
`style` for the `root` element.

### composeStyles(...styles)

Composes multiple styles definitions in one.

### extendComponentStyles(styledComponent, styles)

Creates new styled component extended with additional styles.

## License

This software is released into the public domain.
See the LICENSE file.
