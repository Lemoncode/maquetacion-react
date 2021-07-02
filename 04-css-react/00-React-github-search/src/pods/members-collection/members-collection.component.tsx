import React from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { MemberEntity } from "model";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

interface Props {
	showMembers: MemberEntity[];
	totalMembers: number;
	page: number;
	handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
	loadMember: (login: string) => void;
}

const useStyles = makeStyles(
	(theme) => ({
		root: {
			display: "flex",
			flexWrap: "wrap",
			justifyContent: "center",
			width: "100%",
			padding: "0 20px",
			"& > * + *": {
				marginTop: theme.spacing(2),
			},
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
		},
		pagination: {
			margin: "30px auto",
		},
		carRoot: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
		large: {
			width: theme.spacing(18),
			height: theme.spacing(18),
			margin: "5% auto",
		},
	}),
	{ name: "members-collections.module" }
);

export const MembersCollectionComponent: React.FunctionComponent<Props> = (
	props
) => {
	const classes = useStyles();
	const { showMembers, totalMembers, page, handleChange, loadMember } = props;

	return (
		<>
			<div className={classes.root}>
				<Grid container spacing={3} style={{ justifyContent: "center" }}>
					{showMembers.map((member: MemberEntity) => (
						<Grid item xs={8} sm={4} md={3} key={member.id}>
							<Paper className={classes.paper}>
								<Card className={classes.carRoot}>
									<CardActionArea>
										<CardMedia className={classes.media} title={member.login}>
											<Avatar
												alt="Remy Sharp"
												src={member.avatar_url}
												className={classes.large}
											/>
										</CardMedia>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												{member.login}
											</Typography>
											<Typography gutterBottom variant="body2" component="h6">
												{member.company}
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Button
											size="small"
											color="primary"
											onClick={(e) => loadMember(member.login)}
										>
											Ver Perfil
										</Button>
									</CardActions>
								</Card>
							</Paper>
						</Grid>
					))}
				</Grid>
			</div>
			<div className={classes.root}>
				<Pagination
					className={classes.pagination}
					count={totalMembers}
					page={page}
					onChange={handleChange}
					renderItem={(item) => (
						<PaginationItem
							component={Link}
							to={`?page=${item.page}`}
							onClick={handleChange}
							{...item}
						/>
					)}
				/>
			</div>
		</>
	);
};
