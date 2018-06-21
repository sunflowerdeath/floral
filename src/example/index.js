import React from 'react'
import ReactDOM from 'react-dom'

import floral, { extendComponentStyles } from '../index'

const styles = (props, state) => {
	const root = {
		display: 'inline-block',
		padding: 10,
		backgroundColor: '#ccc',
		cursor: 'pointer'
	}

	if (state.pressed) {
		root.backgroundColor = '#999'
	} else if (state.hovered) {
		root.backgroundColor = '#aaa'
	}

	return { root }
}

@floral(styles)
class Button extends React.Component {
	state = {
		hovered: false,
		pressed: false
	}

	render() {
		const styles = this.state.computedStyles
		return (
			<div
				style={styles.root}
				onMouseEnter={() => this.setState({ hovered: true })}
				onMouseLeave={() => this.setState({ hovered: false })}
				onMouseDown={() => this.setState({ pressed: true })}
				onMouseUp={() => this.setState({ pressed: false })}
			>
				{this.props.children}
			</div>
		)
	}
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

const GreenButton = extendComponentStyles(Button, (props, state) => {
	const root = { backgroundColor: '#2ea629', color: 'white' }
	if (state.pressed) {
		root.backgroundColor = '#286d25'
	} else if (state.hovered) {
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
const Message = floral(messageStyles)(props => {
	const { children, computedStyles } = props
	return <div style={computedStyles.root}>{children}</div>
})

class Example extends React.Component {
	render() {
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
}

ReactDOM.render(<Example />, document.querySelector('.container'))
