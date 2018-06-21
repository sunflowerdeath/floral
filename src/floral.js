import React from 'react'

import computeStyles from './computeStyles'

const FloralContext = React.createContext()

const isClassComponent = Component =>
	Boolean(
		Component &&
			Component.prototype &&
			typeof Component.prototype.render === 'function'
	)

const floral = styles => Component => {
	let result
	if (isClassComponent(Component)) {
		class FloralComponent extends Component {
			static getDerivedStateFromProps(props, state) {
				const { floralOptions, ...restProps } = props
				const originalDerivedState =
					Component.getDerivedStateFromProps &&
					Component.getDerivedStateFromProps(props, state)
				const nextState = { ...state, ...originalDerivedState }
				return {
					...originalDerivedState,
					computedStyles: computeStyles({
						styles,
						options: floralOptions,
						props: restProps,
						state: nextState
					})
				}
			}
		}
		result = React.forwardRef((props, ref) => (
			<FloralContext.Consumer>
				{options => (
					<FloralComponent
						{...props}
						floralOptions={options}
						ref={ref}
					/>
				)}
			</FloralContext.Consumer>
		))
	} else {
		result = React.forwardRef((props, ref) => (
			<FloralContext.Consumer>
				{options => (
					<Component
						{...props}
						computedStyles={computeStyles({
							styles,
							options,
							props
						})}
						ref={ref}
					/>
				)}
			</FloralContext.Consumer>
		))
	}
	result.isFloral = true
	result.displayName = 'floral'
	result.innerComponent = Component
	result.styles = styles
	return result
}

export default floral
export { FloralContext }
