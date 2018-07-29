import _ from "lodash";
import moment from "moment";

export default function(dates) {
  _.forEach(dates, (val, key) => {
      dates[key] = moment(val).format('D MMM YYYY');
  });

  return dates;
}