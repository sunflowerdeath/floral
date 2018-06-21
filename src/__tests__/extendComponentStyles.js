import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import assert from 'assert'
import { spy } from 'sinon'
import TestRenderer from 'react-test-renderer'

import floral from '../floral.js'
import extendComponentStyles from '../extendComponentStyles.js'

describe('floral/extendComponentStyles', () => {
	it('extends styles', () => {
		const styles = { root: { color: 'red' } }
		const Styled = floral(styles)(props => (
			<div style={props.computedStyles.root} />
		))
		const extendedStyles = { root: { fontWeight: 'bold' } }
		const ExtendedStyled = extendComponentStyles(Styled, extendedStyles)
		const testRenderer = TestRenderer.create(<ExtendedStyled />)
		const expectedStyles = { ...styles.root, ...extendedStyles.root }
		assert.deepEqual(
			testRenderer.root.findByType('div').props.style,
			expectedStyles
		)
	})
})
