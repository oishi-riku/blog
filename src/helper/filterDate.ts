import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

type Props = {
  date: Date;
  withTime: boolean;
};

const filterDate = ({ date, withTime = false }: Props) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs
    .utc(date)
    .tz('Asia/Tokyo')
    .format(withTime ? 'YYYY/MM/DD HH:mm:ss' : 'YYYY/MM/DD');
};

export default filterDate;
