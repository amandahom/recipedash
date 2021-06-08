/// <reference types="next" />
/// <reference types="next/types/global" />

interface CustomNodeJsGlobal extends NodeJS.Global {
  myExtraGlobalVariable: number;
  mongo: any;
}
