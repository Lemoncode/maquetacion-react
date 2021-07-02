import * as React from "react";
import { SearchAppBar } from "common";

export const AppLayout: React.FunctionComponent = (props) => {
	const { children } = props;

	return (
		<>
			<SearchAppBar />
			{children}
		</>
	);
};
