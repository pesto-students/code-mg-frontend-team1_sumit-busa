import _ from 'lodash';

export const isNilOrEmpty = (value:any) =>
  _.isNil(value) || _.isEmpty(value) || _.isNull(value) || _.isNaN(value);

export const getFormattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const isPresent = (value:any) => !isNilOrEmpty(value);
