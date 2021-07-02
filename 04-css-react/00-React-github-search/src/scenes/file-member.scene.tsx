import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { AppLayout } from "layout";
import { BarTitleComponent, FileCardMemberContainer } from "pods";

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
	{ name: "file-member-scene.module" }
);

export const FileMemberScene: React.FunctionComponent = () => {
	const classes = useStyles();

	return (
		<AppLayout>
			<div className={classes.root}>
				<BarTitleComponent />
				<FileCardMemberContainer />
			</div>
		</AppLayout>
	);
};
