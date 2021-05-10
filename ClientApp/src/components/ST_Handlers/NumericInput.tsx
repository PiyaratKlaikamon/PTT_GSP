import React from "react";
import InputFormat from "./InputFormat";

interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    allowZero?: Boolean,
    allowNegative?: Boolean,
    integerLength?: number,
    decimalLength?: number,
    minValue?: number,
    maxValue?: number,
    value?: number,
    onChange?: (value?: number) => void
}
interface IState {
    inputOnChange: React.ChangeEventHandler<HTMLInputElement>,
    inputAttrs: object | undefined
}
export default class NumericInput extends React.Component<IProps, IState>  {
    constructor(props) {
        super(props);
        this.state = {
            inputOnChange: () => { },
            inputAttrs: undefined
        };
    }

    inputRef = React.createRef<HTMLInputElement>();

    componentDidMount() {
        let e_input = this.inputRef.current;
        if (e_input) {
            let { allowZero, allowNegative, integerLength, decimalLength, minValue, maxValue, value, onChange, ...attrs } = this.props;
            let i = InputFormat.Numeric(e_input, allowNegative, integerLength, decimalLength, minValue, maxValue);
            i.SetValue(value);

            this.setState({
                inputOnChange: () => {
                    if (onChange) {
                        let val = i.GetValue();
                        if (allowZero) onChange(val);
                        else {
                            let nVal = +val;
                            onChange(nVal || undefined);
                        }
                    }
                },
                inputAttrs : attrs
            });
        }
    }

    render() {
        return <input ref={this.inputRef} type="text" value={this.props.value} onChange={this.state.inputOnChange} {...this.state.inputAttrs} />;
    }
}