import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

type Props = {
  date: Date;
  withTime: boolean;
};

const filterDate = ({ date, withTime = false }: Props): string => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs
    .utc(date)
    .tz('Asia/Tokyo')
    .format(withTime ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY/MM/DD');
};

export default filterDate;
