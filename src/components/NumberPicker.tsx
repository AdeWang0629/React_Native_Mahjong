import React, {useState} from 'react';
import {View} from 'react-native';
import Picker from 'rmc-picker';

interface INumberPiecker {
    onPickerChange: any;
    score: number,
    initialValue: number,
}

const NumberPicker:React.FC<INumberPiecker> = ({onPickerChange, score, initialValue}) => {
    const count = 0;
    
    const getItems = (start : any) => {
        const items: any[] = [];
        if (score == 21) {
            for(let i = start ; i < start + score ; i++){
                items.push(
                <Picker.Item value={i + ''} key={i}>
                    { (i == 0) ? ('0.0') : ((i == 10) ? ('1.0') : ((i == 20) ? ('2.0') : i/10)) }
                </Picker.Item>
                );
            }    
        } else if (score == 11) {
            for(let i = start ; i < start + score ; i++){
                items.push(
                <Picker.Item value={i + ''} key={i}>
                    { i }
                </Picker.Item>
                );
            }    
        }

        return items;
    }
    
    const [value, setValue] = React.useState(initialValue);
    const [items, setItems] = React.useState(getItems(count));

    const onChange = (i : any) => {
        console.log('onChangeNumberPicker', i);
        setValue(i);
        onPickerChange(i);
    }

    const onScrollChange = (value : any) => {
        console.log('onScrollChange', value);

    }

    return (
        <View style={{borderTopWidth: .3}}>
            {/* <Picker onValueChange={}>
                <Picker.Item value="1">
                    1
                </Picker.Item>
                <Picker.Item value="2">
                    2
                </Picker.Item>
                <Picker.Item value="3">
                    3
                </Picker.Item>
                <Picker.Item value="4">
                    4
                </Picker.Item>
                <Picker.Item value="5">
                    5
                </Picker.Item>
                <Picker.Item value="6">
                    6
                </Picker.Item>
                <Picker.Item value="7">
                    7
                </Picker.Item>
                <Picker.Item value="8">
                    8
                </Picker.Item>
                <Picker.Item value="9">
                    9
                </Picker.Item>
                <Picker.Item value="10">
                    10
                </Picker.Item>
            </Picker>              */}
            <Picker
                selectedValue={value}
                onValueChange={onChange}
                onScrollChange={onScrollChange}
            >
                {items}
            </Picker>
        </View>
    )
}

export default NumberPicker;