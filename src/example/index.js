import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { useStyles, extendComponentStyles } from '../index'

const styles = (props, hovered, pressed) => {
    const root = {
        display: 'inline-block',
        padding: 10,
        backgroundColor: '#ccc',
        cursor: 'pointer'
    }

    if (pressed) {
        root.backgroundColor = '#999'
    } else if (hovered) {
        root.backgroundColor = '#aaa'
    }

    return { root }
}

const Button = props => {
    const [hovered, setHovered] = useState(false)
    const [pressed, setPressed] = useState(false)
    const computedStyles = useStyles(styles, [props, hovered, pressed])
    return (
        <div
            style={computedStyles.root}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
        >
            {props.children}
        </div>
    )
}

const SizedButton = extendComponentStyles(Button, props => {
    let root
    if (props.size === 'small') {
        root = { fontSize: '0.75em' }
    } else if (props.size === 'big') {
        root = { fontSize: '1.5em' }
    }
    return { root }
})

const GreenButton = extendComponentStyles(Button, (props, hovered, pressed) => {
    const root = { backgroundColor: '#2ea629', color: 'white' }
    if (pressed) {
        root.backgroundColor = '#286d25'
    } else if (hovered) {
        root.backgroundColor = '#318a2d'
    }
    return { root }
})

const messageStyles = {
    root: {
        borderLeft: '6px solid #999',
        background: '#ddd',
        padding: 10
    }
}

const Message = props => {
    const { children } = props
    const computedStyles = useStyles(messageStyles, [props])
    return <div style={computedStyles.root}>{children}</div>
}

const Example = props => {
    return (
        <div>
            <Button>Button</Button>
            <br />
            <br />
            <SizedButton size="small">Small button</SizedButton>
            <br />
            <br />
            <Button style={{ fontSize: '1.5em' }}>Big button</Button>
            <br />
            <br />
            <GreenButton>Green button</GreenButton>
            <br />
            <br />
            <Message>Message!</Message>
            <br />
            <Message
                style={{
                    background: '#2ea629',
                    color: 'white',
                    borderLeftColor: '#286d25'
                }}
            >
                Green message!
            </Message>
        </div>
    )
}

ReactDOM.render(<Example />, document.querySelector('.container'))
