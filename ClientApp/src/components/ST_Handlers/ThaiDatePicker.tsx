import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface IProps {
    small?: boolean,
    large?: boolean,
    placeholder?: string,
    minDate?: Date,
    maxDate?: Date,
    value?: Date,
    onChange?: (value?: Date) => void,
    disabledKeyboard?: boolean,
    disabled?: boolean,
}

interface IState {
    calendarVisible: boolean
}

export default class ThaiDatePicker extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            calendarVisible: false
        };
    }

    refDivInput = React.createRef<HTMLDivElement>();
    refDivCalendar = React.createRef<HTMLDivElement>();

    StringToDate(s: string) {
        let d: Date | undefined = undefined;
        var arr = s.split("/");
        if (arr.length == 3) {
            let dd = +arr[0];
            let MM = +arr[1] - 1;
            let yyyy = +arr[2];
            if (yyyy > 2100) d = new Date(yyyy - 543, MM, dd);
        }
        return d;
    }
    DateToString(d: Date | null | undefined) {
        let s = "";
        if (d) {
            let dd = (d.getDate() + "").padStart(2, "0");
            let MM = (d.getMonth() + 1 + "").padStart(2, "0");
            let yyyy = (d.getFullYear() + 543 + "").padStart(4, "0");
            s = dd + "/" + MM + "/" + yyyy;
        }
        return s;
    }

    ElementTest(e: HTMLElement | null, t: EventTarget | null) {
        return (e != null && t != null) ? (e == t || e.contains(t as Node)) : false;
    }

    componentDidMount() {
        document.addEventListener("click", (e) => {
            if (!this.ElementTest(this.refDivInput.current, e.target) && !this.ElementTest(this.refDivCalendar.current, e.target)) {
                if (this.state.calendarVisible) this.setState({ calendarVisible: false });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <div ref={this.refDivInput} className={"flex-nowrap input-group" + (this.props.small ? " input-group-sm" : "") + (this.props.large ? " input-group-lg" : "")}>
                    <input type="text" className="form-control" value={this.DateToString(this.props.value)}
                        placeholder={this.props.placeholder || "วว/ดด/ปปปป"}
                        onChange={this.props.disabledKeyboard ? undefined : (e) => {
                            let d = this.StringToDate(e.target.value);
                            if (this.props.onChange) this.props.onChange(d);
                        }}
                        onFocus={() => { if (!this.state.calendarVisible) this.setState({ calendarVisible: true }); }}
                        disabled={this.props.disabled} style={{ flexBasis: "100%" }} />
                    {this.props.disabled ? null : <button className="form-control border-left-0" style={{ minWidth: "auto" }}
                        onClick={() => { if (this.props.onChange) this.props.onChange(undefined); }}><i className="fa fa-times"></i></button>}
                    <div className="input-group-append">
                        <button className="btn btn-secondary" disabled={this.props.disabled}
                            onClick={() => this.setState({ calendarVisible: !this.state.calendarVisible })}>
                            <i className="fa fa-calendar-alt"></i>
                        </button>
                    </div>
                </div>
                <div ref={this.refDivCalendar} className="position-relative" style={{ zIndex: 5 }}>
                    <Calendar locale="th-TH"
                        prevLabel={<i className="fa fa-angle-left"></i>} prev2Label={<i className="fa fa-angle-double-left"></i>}
                        nextLabel={<i className="fa fa-angle-right"></i>} next2Label={<i className="fa fa-angle-double-right"></i>}
                        className={"position-absolute" + (this.state.calendarVisible ? "" : " d-none")}
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                        value={this.props.value}
                        onChange={(value) => {
                            if (this.props.onChange) this.props.onChange(value);
                            this.setState({ calendarVisible: false })
                        }} />
                </div>
            </React.Fragment>
        );
    }
}