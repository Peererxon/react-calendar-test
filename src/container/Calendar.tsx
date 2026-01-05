import Slider, { Settings } from "react-slick";
import { CalendarItem } from "../components/CalendarItem";
import './styles/Calendar.css';
import { useCallback, useState } from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight'
import { actualMonthDays, actualMonthName, todayFormatted } from "../utils/ActualMonth";
import { Button, Menu, MenuItem } from "@mui/material";
import CalendarMonthTwoTone from "@mui/icons-material/CalendarMonthTwoTone";


export const Calendar = () => {
  const [actualMonthState, setActualMonthState] = useState(actualMonthDays)
  /* Menu */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [calendarOption, setCalendarOption] = useState<'Weekly' | 'Monthly'>('Monthly')
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (setting?: 'Weekly' | 'Monthly') => {
    setCalendarOption(setting ? setting : calendarOption )
    setAnchorEl(null);
  };
  /* End Menu */

    //changing settings to show calendar from week to month by the calendarOption state
    const settings: Settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: calendarOption === 'Weekly' ? 7 : 1,
      slidesPerRow: calendarOption === 'Weekly' ? 1 : 7,
      slidesToScroll: 7,
      rows: calendarOption === 'Weekly' ? 1 : 5,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
  };

  /**
   * 
   * @description compare the days with the days selected to watch who match
   */
  const handleSelectedDay = (daySelected: string) => {
   const newState =  actualMonthState.map((dayOfMonth) => {
      return (
        daySelected === (`${dayOfMonth.dayName}/${dayOfMonth.dayNumber}`) ? { ...dayOfMonth, daySelected: true } :  { ...dayOfMonth, daySelected: false }
      )
    })
    
    setActualMonthState(newState)
  }

  function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <ArrowCircleLeftIcon
        onClick={onClick}
        className={className}
        color='primary'
        style={{ ...style }}
        fontSize={ 'large' }
      />
    );
  }
  
  function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <ArrowCircleRight
        onClick={onClick}
        className={className}
        color='primary'
        style={{ ...style }}
        fontSize={ 'large' }
      />
    );
}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelectedDayMemo = useCallback( handleSelectedDay,[]) // to avoid re-renders into the sliders items
  
    return (
      <div className="container">
        <div className="calendarOptions">
          <div className="calendarOptions__title">
           <h1> {actualMonthName} </h1> 
          </div>
          <div className="calendarOptions__menu">
            <div>
              <Button
                id="calendar-settings"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Options
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="calendar-settings"
                anchorEl={anchorEl}
                open={open}
                onClose={ () => handleClose()}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => handleClose('Weekly')}>
                  <Button variant="outlined" endIcon={<CalendarMonthTwoTone />}> Weekly </Button>
                </MenuItem>
                <MenuItem onClick={() => handleClose('Monthly')}>
                  <Button variant="outlined" endIcon={<CalendarMonthTwoTone />}> Monthly </Button>
                </MenuItem>
              </Menu>
            </div>

          </div>
            
        </div>
        <Slider {...settings}>
          
            {
              actualMonthState.map((day) => (
                <div key={`${day.dayName}/${day.dayNumber}`}>

                  <CalendarItem
                    onSelect={ handleSelectedDayMemo }
                    {...day}
                    isActualDay={ todayFormatted === (`${day.dayName}/${day.dayNumber}`) }
                  />
                </div>
              ))
            }
        </Slider>
      </div>
    );
}