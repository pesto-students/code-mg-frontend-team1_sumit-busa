import _ from "lodash";
import { isNilOrEmpty } from "./helper";

const MY_WEB_APP_TOKENS = "my-web-app-tokens";
const TOKENS = ["userName", "accessToken", "refreshToken","role"];
const ROLES = ["ADMIN","TEACHER","STUDENT"];
var USER_ROLE : string | null = null;

export const getLocalStorageTokens = () => {
  const currentTokensString = localStorage.getItem(MY_WEB_APP_TOKENS);
  let currentTokensObject: string;
  if (currentTokensString != null) {
    currentTokensObject  = JSON.parse(currentTokensString);
  }

  const returnTokens :{ [key: string]: string }={};

  TOKENS.forEach((token) => {
    returnTokens[`${token}`] = _.get(currentTokensObject, [`${token}`], "");
  });

  return returnTokens;
};

export const setLocalStorageTokens = (tokens:any) => {
  const currentTokens = getLocalStorageTokens();
  const newTokensValues = { ...currentTokens, ...tokens };
  const tokensToSet  :{ [key: string]: string }={};

  TOKENS.forEach((token) => {
    tokensToSet[`${token}`] = newTokensValues[`${token}`];
  });

  localStorage.setItem(MY_WEB_APP_TOKENS, JSON.stringify(tokensToSet));
};

export const userRole = ()=>{
  return USER_ROLE;
}

export const isPresentLocalStorageTokens = () => {
  const currentTokens = getLocalStorageTokens();
  let isAllTokensPresent = true;

  TOKENS.forEach((tokenName) => {
    const tokenValue = currentTokens[`${tokenName}`];

    if (isNilOrEmpty(tokenValue)) {
      isAllTokensPresent = false;
    }
    if(tokenName == "role"){
      USER_ROLE = currentTokens[`${tokenName}`];
    }
  });

  return isAllTokensPresent;
};

export const clearLocalStorageTokens = () => {
  localStorage.removeItem(MY_WEB_APP_TOKENS);
};
