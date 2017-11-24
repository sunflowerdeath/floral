# Floral :cherry_blossom:

Library that helps to use inline styles in React components.
It doesn't convert styles to CSS or implement special features from CSS
like pseudo-classes or media queries.
It just helps to use plain inline styles and provides simple way to extend them.

## Install

```
npm install floral --save
```

## Usage

```js
import floral from 'floral'

// Decorator that enables defining styles on component
@floral
class Button extends React.Component {
    // Property for defining styles
    // It is an object with styles of component's elements
    static styles = {
        root: {
            display: 'inline-block',
            padding: '10px 5px'
        }
    }

    render() {
        // Using styles:
        return <div style={this.styles.root}>{this.props.children}</div>
    }
}

import { composeStyles } from 'floral'

class ColoredButton extends Button {
    // You can extend styles using `composeStyles`.
    // Also, you can define dynamic styles using function that takes 
    // current props, state and context and returns object with styles.
    static styles = composeStyles(Button.styles, (props/*, state, context*/) => ({
        root: {
            background: props.color
        }
    })
}

// You can extend styles in place
let bigButton = <Button styles={{ root: { fontSize: 20 } }}>Big Font</Button>

// Shorthand property for extending styles of the root element
let bigButton = <Button style={{ fontSize: 20 }}>Big font</Button>
```

## FAQ

**Why inline styles?**
<br>
Because inline styles provide better isolation, extensibility, and allow to use
full power of Javascript.

**What about performance?**
<br>
Inline styles have some overhead comparing to CSS, but I don't care.

**I want to use CSS features like pseudo classes or media queries.**
<br>
Then don't use this library.

## API

### @floral

Decorator that enables defining styles on components.

Styles can be defined in two places:
- static property `styles`
- React prop `styles`

Value can be an object with styles of component's elements, or
function that takes props, state and context and returns such object.

When rendering, evaluated styles are available in `this.styles`

### composeStyles(...styles)

Composes multiple styles definitions in one.

## TODO

Document auto prefixing and server rendering

## License

This software is released into the public domain.
See the LICENSE file.
