import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import { MembersContext } from "core";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(
	(theme) => ({
		paper: {
			position: "absolute",
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		error: {
			color: "red",
		},
	}),
	{ name: "modal.modul" }
);

export const SimpleModal = () => {
	const membersContext = React.useContext(MembersContext);
	const [modalStyle] = React.useState(getModalStyle);
	const classes = useStyles();
	const [open, setOpen] = React.useState(membersContext.booleanError);

	// Se ejecuta cada vez que cambia la propiedad y muestra el mensaje si el valor es true.
	React.useEffect(() => {
		setOpen(membersContext.booleanError);
	}, [membersContext.booleanError]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<h2 id="simple-modal-title" className={classes.error}>
						Error: {membersContext.organization} no existe.
					</h2>
					<p id="simple-modal-description">{membersContext.txtError}</p>
					<button type="button" onClick={handleClose}>
						Cerrar
					</button>
				</div>
			</Modal>
		</div>
	);
};
