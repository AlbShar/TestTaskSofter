type TErrors = {
  [key in string]: string;
};

type TLink = {
  href: string;
  method: string;
  templated: boolean;
};


export type { TErrors, TLink };