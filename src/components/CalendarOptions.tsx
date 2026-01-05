import { memo } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import CalendarMonthTwoTone from "@mui/icons-material/CalendarMonthTwoTone";

interface Props {
  actualMonthName: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: (setting?: "Weekly" | "Monthly") => void;
}

export const CalendarOptions = memo(
  ({ actualMonthName, open, anchorEl, onOpen, onClose }: Props) => (
    <div className="calendarOptions">
      <div className="calendarOptions__title">
        <h1>{actualMonthName}</h1>
      </div>
      <div className="calendarOptions__menu">
        <div>
          <Button
            id="calendar-settings"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={onOpen}
          >
            Options
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="calendar-settings"
            anchorEl={anchorEl}
            open={open}
            onClose={() => onClose()}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={() => onClose("Weekly")}>
              <Button variant="outlined" endIcon={<CalendarMonthTwoTone />}>
                Weekly
              </Button>
            </MenuItem>
            <MenuItem onClick={() => onClose("Monthly")}>
              <Button variant="outlined" endIcon={<CalendarMonthTwoTone />}>
                Monthly
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  )
);