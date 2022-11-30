import _ from 'lodash';

export const isNilOrEmpty = (value:any) =>
  _.isNil(value) || _.isEmpty(value) || _.isNull(value) || _.isNaN(value);

export const isPresent = (value:any) => !isNilOrEmpty(value);
