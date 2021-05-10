import InputMask from "inputmask";

const MaskedInput = (txt: HTMLInputElement, objInputMask: any) => {
    return {
        InputElement: txt,
        SetValue: (value: any) => { objInputMask.setValue(value) },
        GetValue: () => { return objInputMask.unmaskedvalue() }
    }
};

const InputFormat = {
    Numeric: (e: HTMLElement, allowNegative: Boolean = false,
        integerLength: number = 14, decimalLength: number = 2, minValue?: number, maxValue?: number) => {
        var txt = e as HTMLInputElement;
        var calMaxVal_int = '9'.repeat(integerLength);
        var calMaxVal_decimal = decimalLength ? '9'.repeat(decimalLength) : '0';
        var calMaxVal = +(calMaxVal_int + '.' + calMaxVal_decimal);

        var im = InputMask('numeric', {
            placeholder: '',
            min: minValue != undefined ? minValue : null,
            max: maxValue != undefined ? (maxValue < calMaxVal ? maxValue : calMaxVal) : calMaxVal,
            digits: decimalLength, //ค่าทศนิยม n หลัก
            radixPoint: '.', //จุดทศนิยม
            groupSeparator: ',', //สัญลักษณ์แบ่งหลัก
            autoGroup: true, //การจัดกลุ่มอัตโนมัติ
            allowPlus: false, //อนุญาตใส่เครื่องหมายบวก
            allowMinus: allowNegative, //อนุญาตใส่เครื่องหมายลบ
            unmaskAsNumber: true
        }).mask(txt);

        // txt.onchange = txt.onblur = () => {
        //     if (!allowZero) {
        //         var s = +txt.value;
        //         if (s === 0) txt.value = "";
        //     }
        // };

        return MaskedInput(txt, im);
    },
    Integer: (e: HTMLElement, allowNegative: Boolean = false, length?: number, minValue?: number, maxValue?: number) => {
        return InputFormat.Numeric(e, allowNegative, length, 0, minValue, maxValue);
    },
    Custom: (e: HTMLElement, alias: any) => {
        var txt = e as HTMLInputElement;
        var im = InputMask(alias).mask(txt);
        return MaskedInput(txt, im);
    }
};
export default InputFormat;