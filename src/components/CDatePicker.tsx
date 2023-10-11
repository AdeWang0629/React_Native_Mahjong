import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView, Text, Button} from 'react-native';

interface ICdatePicker {
  onChangeDate: any
}

export const CDatePicker:React.FC <ICdatePicker> = ({onChangeDate}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChangeDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="日付ピッカーを表示!" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};