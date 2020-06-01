import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import assert from 'assert'
import { spy } from 'sinon'
import TestRenderer from 'react-test-renderer'

import { useStyles } from '../index.js'

describe('floral/useStyles', () => {
	it('function components', () => {
		const STYLE = { color: 'red' }
		const PROPS = { props: 'props' }
		const styles = spy(props => ({ root: STYLE }))
		const Styled = props => {
		    const computedStyles = useStyles(styles, [props])
			return <div style={computedStyles.root} />
		}
		const testRenderer = TestRenderer.create(<Styled {...PROPS} />)
		assert.deepEqual(testRenderer.root.findByType('div').props.style, STYLE)
		assert(styles.calledWith(PROPS), 'Styles called with props')
	})

	it('prop styles', () => {
		const styles = { root: { color: 'red' } }
		const Styled = props => {
		    const computedStyles = useStyles(styles, [props])
			return <div style={computedStyles.root} />
		}
		const renderer = TestRenderer.create(
			<Styled styles={{ root: { fontWeight: 'bold' } }} />
		)
		const composed = { color: 'red', fontWeight: 'bold' }
		assert.deepEqual(renderer.root.findByType('div').props.style, composed)
	})

	it('prop style', () => {
		const styles = { root: { color: 'red' } }
		const Styled = props => {
		    const computedStyles = useStyles(styles, [props])
			return <div style={computedStyles.root} />
		}
		const renderer = TestRenderer.create(
			<Styled style={{ fontWeight: 'bold' }} />
		)
		const composed = { color: 'red', fontWeight: 'bold' }
		assert.deepEqual(renderer.root.findByType('div').props.style, composed)
	})
})
