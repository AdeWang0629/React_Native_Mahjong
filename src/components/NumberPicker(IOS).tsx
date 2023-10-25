import React, {useState} from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { INumberPiecker } from '../interface/NumberPicker';

const NumberPicker : React.FC<INumberPiecker> = ({onPickerChange, score, initialValue}) => {
    const count = 0;
    
    const getItems = (start : any) => {
        const items: any[] = [];
        if (score == 13) {
            for(let i = start ; i < start + score ; i++){
                if (i < 5) {
                    items.push(
                        <Picker.Item label={ `${(i + 1) / 10}` } value={`${i + 1}`} key={i}/>
                    );
                }else if (i == 5) {
                    items.push(
                        <Picker.Item label={ `${(i + 2) / 10}` } value={`${i + 2}`} key={i}/>
                    );
                }else if (i == 6) {
                    items.push(
                        <Picker.Item label={ '1.0' } value={`${i + 4}`} key={i}/>
                    );
                }else if (i == 7) {
                    items.push(
                        <Picker.Item label={ '2.0' } value={`${i + 13}`} key={i}/>
                    );
                }else if (i == 8) {
                    items.push(
                        <Picker.Item label={ '3.0' } value={`${i + 22}`} key={i}/>
                    );
                }else if (i == 9) {
                    items.push(
                        <Picker.Item label={ '4.0' } value={`${i + 31}`} key={i}/>
                    );
                }else if (i == 10) {
                    items.push(
                        <Picker.Item label={ '5.0' } value={`${i + 40}`} key={i}/>
                    );
                }else if (i == 11) {
                    items.push(
                        <Picker.Item label={ '10.0' } value={`${i + 89}`} key={i}/>
                    );
                }else if (i == 12) {
                    items.push(
                        <Picker.Item label={ '20.0' } value={`${i + 188}`} key={i}/>
                    );
                }
            }    
        } else if (score == 11) {
            for(let i = start ; i < start + score ; i++){
                items.push(
                    <Picker.Item label={ `${ i }` } value={`${i}`} key={i}/>
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

    return (
        <View style={{borderTopWidth: .3}}>
            <Picker
                selectedValue={value.toString()}
                onValueChange={onChange}
            >
                {items}
            </Picker>
        </View>
    )
}

export default NumberPicker;