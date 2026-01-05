import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

export function PrevArrow(props: any) {
	const { className, style, onClick } = props;
	return (
		<ArrowCircleLeftIcon
			onClick={onClick}
			className={className}
			color="primary"
			style={{ ...style }}
			fontSize={"large"}
		/>
	);
}
