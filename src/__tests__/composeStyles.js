import assert from 'assert'

import composeStyles from '../composeStyles.js'

describe('floral/composeStyles', function() {
	it('composes styles', function() {
		const STYLES_A = { root: { fontWeight: 'bold' } }
		const STYLES_B = props => ({ root: { color: props.color } })
		const composed = composeStyles(STYLES_A, STYLES_B)
		const styles = composed({ color: 'red' })
		assert.deepEqual(styles, { root: { color: 'red', fontWeight: 'bold' } })
	})
})
