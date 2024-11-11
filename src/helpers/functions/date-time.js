import moment from "moment/moment";
import "moment/locale/de";

export const getCurrentDate = () => {
  return moment().format("YYYY-MM-DD");
};

export const formatDateToYYYYMMDD = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const convertCurrentDateToUserFormat = (date) => {
  return moment(date).format("DD MMMM YYYY");
};
