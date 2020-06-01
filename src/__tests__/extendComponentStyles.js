import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import assert from 'assert'
import { spy } from 'sinon'
import TestRenderer from 'react-test-renderer'

import { extendComponentStyles, useStyles } from '../index.js'

describe('floral/extendComponentStyles', () => {
	it('extends styles', () => {
		const styles = { root: { color: 'red' } }
		const Styled = props => {
		    const computedStyles = useStyles(styles, [props])
			return <div style={computedStyles.root} />
		}
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
