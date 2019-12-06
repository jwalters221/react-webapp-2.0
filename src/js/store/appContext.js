import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default its just going to be Null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to Layout.jsx, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.jsx#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * EDIT THIS!
			 * This function is the equivalent to "window.onLoad", it only run once on the entire application lifetime
			 * you should do your ajax requests or fetch api requests here
			 *
			 * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
			 *
			 */

			let urls = ["https://swapi.co/api/planets/", "https://swapi.co/api/people/"];
			let promises = urls.map(url => fetch(url).then(response => response.json()));
			Promise.all(promises).then(results => {
				let { store, actions } = state;
				setState({
					store: { ...store, planets: results[0].results, people: results[1].results },
					actions
				});
			});
		}, []);

		// the initial value for the context its not null anymore, but the current state of this component,
		// the context will have a getStore and setStore functions available then, because they were declared
		// on the state of this component
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;
