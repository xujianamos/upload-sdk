type TObjectKey = {
  [key: string]: any;
};

interface Window {
  webkit: {
    messageHandlers: TObjectKey;
    [key: string]: any;
  };
  [key: string]: any;
}
