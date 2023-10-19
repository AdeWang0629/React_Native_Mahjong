import React, {useState} from 'react';
import {View} from 'react-native';
import Picker from 'rmc-picker';
import { INumberPiecker } from '../interface/NumberPicker';

const NumberPicker : React.FC<INumberPiecker> = ({onPickerChange, score, initialValue}) => {
    const count = 0;
    
    const getItems = (start : any) => {
        const items: any[] = [];
        if (score == 39) {
            for(let i = start ; i < start + score ; i++){
                if (i < 21) {
                    items.push(
                        <Picker.Item value={i + ''} key={i}>
                            { (i == 0) ? ('0.0') : ((i == 10) ? ('1.0') : ((i == 20) ? ('2.0') : i/10)) }
                        </Picker.Item>
                    );
                }else{
                    const number = i-18;
                    items.push(
                        <Picker.Item value={i + ''} key={i}>
                            {number.toFixed(1)}
                        </Picker.Item>
                    );
                }
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
        setValue(i);
        onPickerChange(i);
    }

    const onScrollChange = (value : any) => {
    }

    return (
        <View style={{borderTopWidth: .3}}>
            <Picker
                selectedValue={value.toString()}
                onValueChange={onChange}
                onScrollChange={onScrollChange}
            >
                {items}
            </Picker>
        </View>
    )
}

export default NumberPicker;