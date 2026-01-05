import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";

export function NextArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<ArrowCircleRight
			onClick={onClick}
			className={className}
			color="primary"
			style={{ ...style }}
			fontSize={"large"}
		/>
	);
}
