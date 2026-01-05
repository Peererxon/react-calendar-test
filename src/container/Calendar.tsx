import Slider, { Settings } from "react-slick";
import { CalendarItem } from "../components/CalendarItem";
import "./styles/Calendar.css";
import { useCallback, useState } from "react";
import {
	actualMonthDays,
	actualMonthName,
	todayFormatted,
} from "../utils/ActualMonth";
import { CalendarOptions } from "../components/CalendarOptions";
import { PrevArrow } from "../components/PrevArrow";
import { NextArrow } from "../components/NextArrow";

export const Calendar = () => {
	const [actualMonthState, setActualMonthState] = useState(actualMonthDays);
	/* Menu */
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [calendarOption, setCalendarOption] = useState<"Weekly" | "Monthly">(
		"Monthly"
	);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (setting?: "Weekly" | "Monthly") => {
		setCalendarOption(setting ? setting : calendarOption);
		setAnchorEl(null);
	};
	/* End Menu */

	//changing settings to show calendar from week to month by the calendarOption state
	const settings: Settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: calendarOption === "Weekly" ? 7 : 1,
		slidesPerRow: calendarOption === "Weekly" ? 1 : 7,
		slidesToScroll: 7,
		rows: calendarOption === "Weekly" ? 1 : 5,
		arrows: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	/**
	 *
	 * @description compare the days with the days selected to watch who match
	 */
	const handleSelectedDay = (daySelected: string) => {
		const newState = actualMonthState.map((dayOfMonth) => {
			return daySelected === `${dayOfMonth.dayName}/${dayOfMonth.dayNumber}`
				? { ...dayOfMonth, daySelected: true }
				: { ...dayOfMonth, daySelected: false };
		});

		setActualMonthState(newState);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleSelectedDayMemo = useCallback(handleSelectedDay, []); // to avoid re-renders into the sliders items

	return (
		<div className="container">
			<CalendarOptions
				actualMonthName={actualMonthName}
				open={open}
				anchorEl={anchorEl}
				onOpen={handleClick}
				onClose={handleClose}
			/>
			<Slider {...settings}>
				{actualMonthState.map((day) => (
					<div key={`${day.dayName}/${day.dayNumber}`}>
						<CalendarItem
							onSelect={handleSelectedDayMemo}
							{...day}
							isActualDay={todayFormatted === `${day.dayName}/${day.dayNumber}`}
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};
