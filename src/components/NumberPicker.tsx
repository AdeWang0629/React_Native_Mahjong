import React, {useState} from 'react';
import {View} from 'react-native';
import Picker from 'rmc-picker';
import { INumberPiecker } from '../interface/NumberPicker';

const NumberPicker : React.FC<INumberPiecker> = ({onPickerChange, score, initialValue}) => {
    const count = 0;
    
    const getItems = (start : any) => {
        const items: any[] = [];
        if (score == 13) {
            for(let i = start ; i < start + score ; i++){
                if (i < 5) {
                    items.push(
                        <Picker.Item value={i + 1} key={i}>
                            { (i + 1) / 10 }
                        </Picker.Item>
                    );
                }else if (i == 5) {
                    items.push(
                        <Picker.Item value={i + 2} key={i}>
                            { (i + 2) / 10 }
                        </Picker.Item>
                    );
                }else if (i == 6) {
                    items.push(
                        <Picker.Item value={i + 4} key={i}>
                            {('1.0')}
                        </Picker.Item>
                    );
                }else if (i == 7) {
                    items.push(
                        <Picker.Item value={i + 13} key={i}>
                            {('2.0')}
                        </Picker.Item>
                    );
                }else if (i == 8) {
                    items.push(
                        <Picker.Item value={i + 22} key={i}>
                            {('3.0')}
                        </Picker.Item>
                    );
                }else if (i == 9) {
                    items.push(
                        <Picker.Item value={i + 31} key={i}>
                            {('4.0')}
                        </Picker.Item>
                    );
                }else if (i == 10) {
                    items.push(
                        <Picker.Item value={i + 40} key={i}>
                            {('5.0')}
                        </Picker.Item>
                    );
                }else if (i == 11) {
                    items.push(
                        <Picker.Item value={i + 89} key={i}>
                            {('10.0')}
                        </Picker.Item>
                    );
                }else if (i == 12) {
                    items.push(
                        <Picker.Item value={i + 188} key={i}>
                            {('20.0')}
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