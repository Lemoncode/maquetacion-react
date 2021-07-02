import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GitHubIcon from "@material-ui/icons/GitHub";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Link from "@material-ui/core/Link";
import { UserEntity } from "model";

interface Props {
	user: UserEntity[];
}

const useStyles = makeStyles(
	(theme: Theme) =>
		createStyles({
			root: {
				maxWidth: 1000,
				minWidth: 350,
				width: "100%",
				border: "none",
				boxShadow: "none",
			},
			media: {
				height: 0,
				paddingTop: "56.25%", // 16:9
			},
			expand: {
				transform: "rotate(0deg)",
				marginLeft: "auto",
				transition: theme.transitions.create("transform", {
					duration: theme.transitions.duration.shortest,
				}),
			},
			expandOpen: {
				transform: "rotate(180deg)",
			},
			avatar: {
				backgroundColor: "#24292E",
			},
		}),
	{ name: "file-member.module" }
);

export const FileCardMemberComponent: React.FunctionComponent<Props> = (
	props
) => {
	const classes = useStyles();
	const { user } = props;
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<>
			{user.map((dataUser: UserEntity) => (
				<Card className={classes.root} key={dataUser.id}>
					<CardHeader
						avatar={
							<Avatar aria-label="recipe" className={classes.avatar}>
								{dataUser.gravatar_id
									? dataUser.gravatar_id
									: dataUser.login.substr(0, 1)}
							</Avatar>
						}
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title={dataUser.name ? dataUser.name : dataUser.login}
						subheader={dataUser.company}
					/>
					<CardMedia
						className={classes.media}
						image={dataUser.avatar_url}
						title={dataUser.name ? dataUser.name : dataUser.login}
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary" component="p">
							{dataUser.bio}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<IconButton aria-label="Followers">
							<PeopleAltIcon />
							<Typography variant="body2" color="textSecondary" component="p">
								{dataUser.followers}
							</Typography>
						</IconButton>
						<IconButton aria-label="Page" type="button">
							<Link
								aria-label="share"
								type="button"
								href={dataUser.html_url}
								target="_blank"
								color="textSecondary"
							>
								<GitHubIcon />
							</Link>
						</IconButton>
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded,
							})}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>{dataUser.location}</Typography>
							<Typography paragraph>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
								non voluptas vitae, praesentium, autem sequi sunt, eos culpa
								itaque voluptatum cupiditate id maxime repellendus mollitia ad
								illum quia fuga voluptatibus?
							</Typography>
							<Typography paragraph>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
								culpa, id facilis dolor nihil illo exercitationem maiores.
								Doloribus vitae similique, enim molestiae sequi assumenda atque
								veniam laboriosam corrupti ad eius.
							</Typography>
							<Typography paragraph>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Architecto vitae aspernatur ipsa laboriosam. Ducimus autem
								nostrum voluptatibus adipisci, cupiditate, temporibus nulla
								tempore veniam assumenda consectetur voluptate esse,
								exercitationem voluptatem. Ipsum.
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			))}
		</>
	);
};
