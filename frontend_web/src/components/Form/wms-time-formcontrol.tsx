//import enUS from 'date-fns/locale/en-US';
//import ptBR from 'date-fns/locale/pt-BR';
//import i18next from 'i18next';
//import moment from 'moment';
//import React from 'react';
//import DatePicker, { registerLocale } from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import { WmsFormProps } from './index';

//registerLocale('pt-BR', ptBR);
//registerLocale('en-US', enUS);

export function WmsTimeFormControl(props: WmsFormProps) {
  /*let selected;
  if (typeof props.value === 'string') {
    selected = moment(props.value).toDate();
  } else {
    selected = props.value;
  }*/

  if (true) return null;
  /*return (
    <DatePicker
      name={props.name}
      className="form-control"
      wrapperClassName="form-control"
      selected={selected}
      onChange={(date, event) => {
        if (props.onChange) {
          props.onChange(date, null, event as React.SyntheticEvent);
        }
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      locale={i18next.language}
      dateFormat="p"
    />
  );*/
}
