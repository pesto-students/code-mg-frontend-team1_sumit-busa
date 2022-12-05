export interface Authentication {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  exp: number;
  iat: number;
}

export type AuthenticationState = {
  value:
    | { readonly kind: "UNAUTHORIZED" }
    | { readonly kind: "LOADING" }
    | {
        readonly kind: "AUTHORIZED";
        readonly authToken: string;
        readonly payload: Authentication;
      };
};
