export interface Directory {
  [index: string]: string | Directory;
}

export interface DirectoryOpen {
  [index: string]: {
    open: boolean;
    content: undefined | DirectoryOpen;
  };
}
