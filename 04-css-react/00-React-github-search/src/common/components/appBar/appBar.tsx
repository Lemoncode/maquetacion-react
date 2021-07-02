import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import GitHubIcon from "@material-ui/icons/GitHub";
import { linkRoutes } from "core";
import { useHistory } from "react-router-dom";

interface Props {}

const useStyles = makeStyles(
	(theme) => ({
		root: {
			flexGrow: 1,
		},
		backGround: {
			backgroundColor: "#24292E",
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			display: "none",
			[theme.breakpoints.up("sm")]: {
				display: "block",
			},
		},
		search: {
			position: "relative",
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			"&:hover": {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginLeft: 0,
			width: "100%",
			[theme.breakpoints.up("sm")]: {
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
			[theme.breakpoints.up("sm")]: {
				width: 120,
				"&:focus": {
					width: 200,
				},
			},
		},
	}),
	{ name: "appbar.module" }
);

export const SearchAppBar = () => {
	const [company, setCompany] = React.useState("");
	const history = useHistory();
	const classes = useStyles();

	const sendForm = (e) => {
		e.preventDefault();
		history.push(linkRoutes.members(company));
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.backGround}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						onClick={(e) => history.push(linkRoutes.root)}
					>
						<GitHubIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						GitHub Search...
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon onClick={sendForm} />
						</div>
						<form onSubmit={sendForm}>
							<InputBase
								placeholder="Ej: lemoncode"
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
				</Toolbar>
			</AppBar>
		</div>
	);
};
