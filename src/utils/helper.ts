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


export const parseJwt = (token: string): any => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const isPresent = (value:any) => !isNilOrEmpty(value);
