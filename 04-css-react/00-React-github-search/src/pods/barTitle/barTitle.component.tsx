import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(
	(theme) => ({
		root: {
			maxWidth: 1000,
			"& > * + *": {
				marginTop: theme.spacing(2),
			},
			margin: "2% auto",
		},
	}),
	{ name: "bar-title.module" }
);

export const BarTitleComponent = () => {
	const { organization } = useParams();
	const title = organization && `${organization.toUpperCase()} Members`;

	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="lg">
				<div className={classes.root}>
					{title && (
						<SnackbarContent
							message={title}
							style={{ backgroundColor: "#24292E" }}
						/>
					)}
				</div>
			</Container>
		</React.Fragment>
	);
};
