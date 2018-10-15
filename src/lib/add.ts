// HACK: Make lodash work in both app and client.
//       import * as _ from 'lodash' works in node, but rollup is broken
//       See https://github.com/rollup/rollup/issues/1267
//       This can be fixed by using lodash-es, but then it wouldn't work in node
//       This is pretty horrible, but I can't find a better simple solution
//       Probably the correct solution involves not using rollup
import { LoDashStatic } from 'lodash';
import * as lodashProxy from 'lodash';
const _: LoDashStatic = (<any>lodashProxy).default || lodashProxy;

export function add2(n: any): number {
  return _.isNumber(n) ? n + 2 : 2;
}
