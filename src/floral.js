import PropTypes from 'prop-types'
import Prefixer from 'inline-style-prefixer'

import composeStyles from './composeStyles'

const prefixers = {}
let allNotSupportedWarnedOnce, unsuppliedUserAgentWarnedOnce, serverRenderingWarnedOnce

export default Component => {
	const name = Component.displayName || Component.name

	class FloralComponent extends Component {
		static displayName = name ? `floral(${name})` : 'Floral'
		
		static contextTypes = {
			...Component.contextTypes,
			floralUserAgent: PropTypes.string,
			floralAutoPrefix: PropTypes.string
		}

		constructor(...args) {
			super(...args)
			if (!this.state) this.state = {}
		}

		componentWillMount() {
			super.componentWillMount && super.componentWillMount()
			this.getStyles(this.props, this.state, this.context)
		}

		componentWillUpdate(nextProps, nextState, nextContext) {
			super.componentWillUpdate &&
				super.componentWillUpdate(nextProps, nextState, nextContext)
			this.getStyles(nextProps, nextState, nextContext)
		}

		getStyles(props, state, context) {
			let rootStyles = Array.isArray(props.style) ?
				props.style.map((style) => ({root: style})) :
				{root: props.style}

			let stylesFn = composeStyles(this.constructor.styles, props.styles, rootStyles)
			let styles = stylesFn(props, state, context)

			for (let elem in styles) {
				styles[elem] = this.postprocessStyle(styles[elem])
			}
			this.styles = styles
		}

		postprocessStyle(style) {
			/* for (let i in style) {
				const value = style[i]
				if (value && value.rgbaString) style[i] = value.rgbaString()
			} */

			const autoPrefixing = this.context.floralAutoPrefixing
			if (autoPrefixing === 'off') {
				return style
			} else if (autoPrefixing === 'all') {
				// FUTURE: remove warn, use Prefixer.prefixAll()
				if (!allNotSupportedWarnedOnce) {
					console.warn(
						'Floral: "all" is not supported, autoprefixing is disabled.'
					)
					allNotSupportedWarnedOnce = true
				}
				return style
			} else {
				const prefixer = this.getPrefixer()
				if (prefixer) return prefixer.prefix(style)
				else return style
			}
		}

		getPrefixer() {
			let userAgent
			if (this.context.floralUserAgent !== undefined) {
				userAgent = this.context.stylesMixinUserAgent
			} else if (typeof navigator !== 'undefined') {
				userAgent = navigator.userAgent
			} else {
				// FUTURE: do not disable autoprefixing, allow auto fallback to prefixAll
				if (!serverRenderingWarnedOnce) {
					serverRenderingWarnedOnce = true
					console.warn(
						'Floral: userAgent should be supplied with UserAgentProvider' +
						'for server-side rendering, autoprefixing is disabled.'
					)
				}
				return
			}

			if (!prefixers[userAgent]) prefixers[userAgent] = new Prefixer({userAgent})
			const prefixer = prefixers[userAgent]
			// FUTURE: remove check and warn, allow auto fallback to prefixAll
			if (prefixer._browserInfo.browser === '') {
				if (!unsuppliedUserAgentWarnedOnce) {
					unsuppliedUserAgentWarnedOnce = true
					console.warn('Floral: supplied userAgent is not supported, ' +
						'autoprefixing is disabled.')
				}
				return
			} else {
				return prefixer
			}
		}
	}

	return FloralComponent
}
