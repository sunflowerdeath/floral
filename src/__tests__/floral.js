import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import assert from 'assert'
import { spy } from 'sinon'
import TestRenderer from 'react-test-renderer'

import floral from '../floral.js'

describe('floral', () => {
	it('function components', () => {
		const STYLE = { color: 'red' }
		const PROPS = { props: 'props' }
		const styles = spy(props => ({ root: STYLE }))
		const Styled = floral(styles)(props => (
			<div style={props.computedStyles.root} />
		))
		const testRenderer = TestRenderer.create(<Styled {...PROPS} />)
		assert.deepEqual(testRenderer.root.findByType('div').props.style, STYLE)
		assert(styles.calledWith(PROPS), 'Styles called with props')
	})

	it('class components', () => {
		const STYLE = { color: 'red' }
		const PROPS = { props: true }
		const STATE = { state: true }
		const DERIVED_STATE = { derived: true }
		const styles = spy(() => ({ root: STYLE }))

		@floral(styles)
		class Styled extends Component {
			state = STATE

			static getDerivedStateFromProps() {
				return DERIVED_STATE
			}

			render() {
				return <div style={this.state.computedStyles.root} />
			}
		}

		const testRenderer = TestRenderer.create(<Styled {...PROPS} />)
		assert.deepEqual(styles.firstCall.args[0], PROPS)
		assert.deepEqual(
			styles.firstCall.args[1],
			Object.assign(STATE, DERIVED_STATE)
		)
		assert.deepEqual(testRenderer.root.findByType('div').props.style, STYLE)
	})

	it('prop styles', () => {
		const styles = { root: { color: 'red' } }
		const Styled = floral(styles)(props => (
			<div style={props.computedStyles.root} />
		))
		const renderer = TestRenderer.create(
			<Styled styles={{ root: { fontWeight: 'bold' } }} />
		)
		const composed = { color: 'red', fontWeight: 'bold' }
		assert.deepEqual(renderer.root.findByType('div').props.style, composed)
	})

	it('prop style', () => {
		const styles = { root: { color: 'red' } }
		const Styled = floral(styles)(props => (
			<div style={props.computedStyles.root} />
		))
		const renderer = TestRenderer.create(
			<Styled style={{ fontWeight: 'bold' }} />
		)
		const composed = { color: 'red', fontWeight: 'bold' }
		assert.deepEqual(renderer.root.findByType('div').props.style, composed)
	})
})
