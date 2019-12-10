import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.planets.map((item, index) => {
					return (
						<li key={index} className="list-group-item d-flex justify-content-between">
							{item.name}
							<Link to={`/single/${index}`}>View Details</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
