import React from "react";
import NumericInput from "../ST_Handlers/NumericInput";

interface IState {
    val1?: number,
    val2?: number,
    val3?: number,
    val4?: number,
    val5?: number,
    val6?: number,
    val7?: number,
    val8?: number,
    val9?: number,
}

export default class TextBox extends React.Component<{}, IState>{
    constructor(props) {
        super(props);
        this.state = {
            val1: 120304.0506,
            val2: 120304.0506,
            val3: -120304.0506,
            val4: 120304.0506,
            val5: 120304.0506,
            val6: 120304.0506,
            val7: 120304.0506,
            val8: 120304.0506,
            val9: 120304.0506,
        };
    }

    render() {
        return (
            <div className="container">
                <div className="card mt-3">
                    <div className="card-header bg-primary text-white">ST_Handlers | NumericInput</div>
                    <div className="card-body">
                        <div className="form-group">
                            <b>{'<NumericInput />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput value={this.state.val1} onChange={(value) => this.setState({ val1: value })} />
                                    <div className="text-muted small">return as {'<input type="text" />'}</div>
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val1 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>{'<NumericInput allowZero={true} />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput allowZero={true} value={this.state.val2} onChange={(value) => this.setState({ val2: value })} />
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val2 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>{'<NumericInput allowNegative={true} />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput allowNegative={true} value={this.state.val3} onChange={(value) => this.setState({ val3: value })} />
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val3 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>{'<NumericInput integerLength={3} />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput integerLength={3} value={this.state.val4} onChange={(value) => this.setState({ val4: value })} />
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val4 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>{'<NumericInput decimalLength={3} />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput decimalLength={3} value={this.state.val5} onChange={(value) => this.setState({ val5: value })} />
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val5 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>{'<NumericInput minValue={500000} />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput minValue={500000} value={this.state.val6} onChange={(value) => this.setState({ val6: value })} />
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val6 + ""}
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <b>{'<NumericInput maxValue={100} />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput maxValue={100} value={this.state.val7} onChange={(value) => this.setState({ val7: value })} />
                                </div>
                                <div className="col-md-6">
                                    state.value: {this.state.val7 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>{'<NumericInput className="form-control" />'}</b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <NumericInput className="form-control"
                                        value={this.state.val8} onChange={(value) => this.setState({ val8: value })} />
                                </div>
                                <div className="col-md-6 col-form-label">
                                    state.value: {this.state.val8 + ""}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <b>
                                {'<div className="input-group">'}<br />
                                &nbsp;&nbsp;&nbsp;{'<NumericInput className="form-control" />'}<br />
                                &nbsp;&nbsp;&nbsp;{'<div className="input-group-append">'}<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<div className="input-group-text">$</div>'}<br />
                                &nbsp;&nbsp;&nbsp;{'</div>'}<br />
                                {'</div>'}
                            </b>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <div className="input-group">
                                        <NumericInput className="form-control"
                                            value={this.state.val9} onChange={(value) => this.setState({ val9: value })} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">$</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-form-label">
                                    state.value: {this.state.val9 + ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}