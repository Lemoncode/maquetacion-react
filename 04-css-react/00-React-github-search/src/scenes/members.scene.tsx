import React from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { AppLayout } from "layout";
import { BarTitleComponent, MembersCollectionContainer } from "pods";
import innerClasses from "./members-scene.styles.scss";

const useStyles = makeStyles(
	(theme) => ({
		root: {
			display: "flex",
			flexWrap: "wrap",
			justifyContent: "center",
			width: "100%",
			padding: "0 20px",
		},
	}),
	{ name: "members-scene.module" }
);

export const MembersScene: React.FunctionComponent = () => {
	const classes = useStyles();

	return (
		<AppLayout>
			<div className={innerClasses.backgroundColor}>
				<div className={classes.root}>
					<BarTitleComponent />
					<MembersCollectionContainer />
				</div>
			</div>
		</AppLayout>
	);
};
