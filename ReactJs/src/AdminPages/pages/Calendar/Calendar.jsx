import * as React from 'react';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from '@syncfusion/ej2-react-schedule';

const Calendar = () => {
  return (
    <div className="w-full h-full bg-main-bg pl-2">
      <ScheduleComponent height="500px" width={1100} style={{ marginLeft: 30 }}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};
export default Calendar;
