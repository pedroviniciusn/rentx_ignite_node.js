import { IDateProvider } from '../IDateProvider';

import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  
  compareInHours(start_date: Date, end_date: Date): number{
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    
    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  async compareIfBefore(start_date: Date, end_date: Date): Promise<boolean> {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DayjsDateProvider };
