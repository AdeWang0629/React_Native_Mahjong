import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, SafeAreaView, Text, Button, Platform} from 'react-native';
import moment from 'moment';
import mt from 'moment-timezone';

interface ICdatePicker {
  onChangeDate: any
}

export const CDatePicker:React.FC <ICdatePicker> = ({onChangeDate}) => {
  console.log("111",mt().tz('Asia/Tokyo').toDate());
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(true);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    if(Platform.OS === 'android'){
      setShow(false);
    }
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
    <SafeAreaView style={styles.container}>
      {/* <Button onPress={showDatepicker} title="日付ピッカーを表示!" /> */}
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
          style={styles.datePicker}
          locale= "ja-JP"
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
  },
});