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

// Also, styles definition can be a function that takes
// current props and state and returns object with styles.
const styles = (props /*, state */) => ({
    root: {
        fontSize: props.size === 'big' ? '20px' : '15px'
    }
})

// Decorator that adds styles to component
@floral(styles)
class Button extends React.Component {
    render() {
        // Get computed styles from state
        const styles = this.state.computedStyles
        return <div style={styles.root}>{this.props.children}</div>
    }
}

// Use with functional components
const Button = floral(styles)(props => {
    // Get computed styles from props
    const styles = props.computedStyles
    return <div style={styles.root}>{props.children}</div>
})
```

### Use of styled components

```js
let bigButton = <Button size="big">Big button</Button>

// You can extend styles in place
let redButton = <Button styles={{ root: { color: 'red' } }}>Red</Button>

// Shorthand property for extending styles of the root element
let greenButton = <Button style={{ color: 'green' }}>Green</Button>
```

### Extending styled components

```js
// You can create new component with additional styles
import { composeStyles } from 'floral'

const coloredButtonStyles = props => ({
    root: { background: props.color }
})

@floral(
    // composeStyles combines multiple styles definitions
    composeStyles(Button.styles, coloredButtonStyles)
)
class ColoredButton extends Button.innerComponent {}

// Same as above, but shorter
import { extendComponentStyles } from 'floral'
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

### floral(styles)

Decorator that adds styles to component.

Styles definition can be an object with styles of component's elements,
or a function that takes props and state and returns such object.

When rendering, computed styles are available
in `this.state.computedStyles` for class components,
and in `this.props.computedStyles` for functional components.

Using prop `styles`, you can set additional styles on decorated component,
and prop `style` for defining style of the root element.

### composeStyles(...styles)

Composes multiple styles definitions in one.

### extendComponentStyles(styledComponent, styles)

Creates new styled component extended with additional styles.

## TODO

Document auto prefixing and server rendering

## License

This software is released into the public domain.
See the LICENSE file.
