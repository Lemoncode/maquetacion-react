import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { linkRoutes } from "core";
import { useHistory } from "react-router-dom";
import logo from "./logoGitHub2.png";

const useStyles = makeStyles(
	(theme) => ({
		root: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100vh",
			backgroundImage: `url(${logo})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "100%",
			backgroundPosition: "center",
			overflow: "hidden",
			width: "100%",
			minWidth: "420px",
			maxWidth: "600px",
		},
		title: {
			width: "100%",
			color: "#ffffff",
			fontSize: "24px",
			textAlign: "center",
			position: "absolute",
			top: "42%",
			display: "flex",
			justifyContent: "center",
		},
		search: {
			position: "relative",
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 1),
			"&:hover": {
				backgroundColor: fade(theme.palette.common.white, 1),
			},
			marginLeft: 0,
			width: "100%",
			[theme.breakpoints.up("xs")]: {
				marginLeft: theme.spacing(1),
				width: "auto",
			},
		},
		searchIcon: {
			width: theme.spacing(7),
			height: "100%",
			position: "absolute",
			pointerEvents: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		inputRoot: {
			color: "inherit",
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 7),
			transition: theme.transitions.create("width"),
			width: "100%",
			[theme.breakpoints.up("xs")]: {
				width: 120,
				"&:focus": {
					width: 200,
				},
			},
		},
	}),
	{ name: "index-search.module" }
);

export const IndexSearchComponent: React.FunctionComponent = () => {
	const classes = useStyles();
	const [company, setCompany] = React.useState("");
	const history = useHistory();

	const sendForm = (e) => {
		e.preventDefault();
		history.push(linkRoutes.members(company));
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				style={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					maxWidth: "900px",
				}}
				fixed
			>
				<Typography component="div" className={classes.root}>
					<div className={classes.title}>GitHub Search...</div>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon onClick={sendForm} />
						</div>
						<form onSubmit={sendForm}>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{
									"aria-label": "search",
								}}
								type="text"
								onChange={(e) => setCompany(e.target.value)}
								className="input-text"
							/>
						</form>
					</div>
				</Typography>
			</Container>
		</React.Fragment>
	);
};
