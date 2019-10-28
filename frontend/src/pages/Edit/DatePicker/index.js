import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import { parseISO } from 'date-fns';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker() {
  const ref = useRef(null);
  registerLocale('pt', pt);
  
  const { fieldName, registerField, defaultValue } = useField('datetime');
   const [selected, setSelected] = useState(defaultValue && parseISO(defaultValue));
   
   const data = new Date();

  console.tron.log(fieldName);
  console.tron.log(data);
  console.tron.log(selected);

  useEffect(() => {
	if (ref.current) {
	  registerField({
		name: fieldName,
		ref: ref.current,
		path: 'props.selected',
	  });
	 
  }}, [fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
		selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        locale="pt"
        showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={60}
		timeCaption="time"
		dateFormat="MMMM d, yyyy h:mm aa"
		placeholderText="Data do meetup"
      />
    </>
  );
}
