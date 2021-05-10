import React from "react";
import ThaiDatePicker from "../ST_Handlers/ThaiDatePicker";

interface IState {
    date0?: Date,
    date1?: Date,
    date2?: Date,
}
export default class DatePicker extends React.Component<{}, IState>{
    constructor(props) {
        super(props);
        this.state = {
            date0: undefined,
            date1: undefined,
            date2: undefined
        };
    }

    componentDidMount() {
        this.setState({ date0: new Date() });
    }

    render() {
        return (
            <div className="container">
                <div className="card mt-3">
                    <div className="card-header bg-primary text-white">ST_Handlers | ThaiDatePicker</div>
                    <div className="card-body">
                        <h3 className="text-primary">DatePicker</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker />
                                    <small className="text-muted">Default setting</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker value={new Date()} />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker value={new Date()} />
                                    <small className="text-muted">{"new Date() => " + new Date()}</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <b>{'<ThaiDatePicker value={stateValue} onChange={(value) => setStateValue(value)} />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker value={this.state.date0} onChange={(value) => this.setState({ date0: value })} />
                                    <small className="text-muted">Use with react-state</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <b>{'<ThaiDatePicker value={stateValue} onChange={(value) => setStateValue(value)} disabledKeyboard={true} />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker value={this.state.date0} onChange={(value) => this.setState({ date0: value })} disabledKeyboard={true} />
                                    <small className="text-muted">Unable to specify value by typing</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker disabled={true}  />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker disabled={true} />
                                    <small className="text-muted">{'<input disabled />'}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker placeholder="DD/MM/YYYY" />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker placeholder="DD/MM/YYYY" />
                                    <small className="text-muted">Custom placeholder-label</small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker small={true}  />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker small={true} />
                                    <small className="text-muted">{'<div className="input-group input-group-sm">{...}</div>'}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker large={true}  />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker large={true} />
                                    <small className="text-muted">{'<div className="input-group input-group-lg">{...}</div>'}</small>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h3 className="text-primary">DateRangePicker</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker maxDate={date2} value={date1} />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker maxDate={this.state.date2} value={this.state.date1}
                                        onChange={(value) => {
                                            let maxDate = this.state.date2;
                                            if (value && maxDate) maxDate = value > maxDate ? undefined : maxDate;
                                            this.setState({ date1: value, date2: maxDate });
                                        }} />
                                    <small className="text-muted">DatePicker for start-date</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <b>{'<ThaiDatePicker minDate={date1} value={date2} />'}</b>
                                <div className="form-group">
                                    <ThaiDatePicker minDate={this.state.date1} value={this.state.date2}
                                        onChange={(value) => {
                                            let minDate = this.state.date1;
                                            if (value && minDate) minDate = value < minDate ? undefined : minDate;
                                            this.setState({ date1: minDate, date2: value });
                                        }} />
                                    <small className="text-muted">DatePicker for end-date</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}