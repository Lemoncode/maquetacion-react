import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import SyncLoader from "react-spinners/SyncLoader";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(
	(theme) => ({
		spinner: {
			width: "100%",
			height: "100%",
			position: "absolute",
			top: "50%",
			pointerEvents: "none",

			"& > div": {
				display: "flex",
				justifyContent: "center",
				alignItems: " center",
			},
		},
	}),
	{ name: "spinner.module" }
);

export const Spinner = () => {
	const { promiseInProgress } = usePromiseTracker();
	const classes = useStyles();

	return (
		promiseInProgress && (
			<div className={classes.spinner}>
				<SyncLoader color="#24292E" />
			</div>
		)
	);
};
