import React from 'react'
import ReactDOM from 'react-dom'

import styledComponent, {composeStyles} from '../src'

@styledComponent
class Button extends React.Component {
	static styles = (props, state) => {
		let root = {
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

		return {root}
	}

	state = {}

	render() {
		return (
			<div
				style={this.styles.root}
				onMouseEnter={() => this.setState({hovered: true})}
				onMouseLeave={() => this.setState({hovered: false})}
				onMouseDown={() => this.setState({pressed: true})}
				onMouseUp={() => this.setState({pressed: false})}
			>
				{this.props.children}
			</div>
		)
	}
}

class SizedButton extends Button {
	static styles = composeStyles(Button.styles, (props) => {
		let root
		if (props.size === 'small') {
			root = {fontSize: '0.75em'}
		} else if (props.size === 'big') {
			root = {fontSize: '1.5em'}
		}
		return {root}
	})
}

class GreenButton extends Button {
	static styles = composeStyles(Button.styles, (props, state) => {
		let root = {backgroundColor: '#2ea629', color: 'white'}
		if (state.pressed) {
			root.backgroundColor = '#286d25'
		} else if (state.hovered) {
			root.backgroundColor = '#318a2d'
		}
		return {root}
	})
}

class Test extends React.Component {
	render() {
		return (
			<div>
				<Button>Button</Button>
				<br/><br/>
				<SizedButton size='small'>Small button</SizedButton>
				<br/><br/>
				<Button style={{fontSize: '1.5em'}}>Big button</Button>
				<br/><br/>
				<GreenButton>Green button</GreenButton>
			</div>
		)
	}
}

ReactDOM.render(
	<Test />,
	document.querySelector('.container')
)
