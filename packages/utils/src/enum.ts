// Object.prototype.toString.call() 返回 "[object Undefined]" → "Undefined"
export enum OBJECT_TYPE {
  // 基础类型
  Undefined = 'Undefined',
  Null = 'Null',
  Boolean = 'Boolean',
  Number = 'Number',
  String = 'String',
  Symbol = 'Symbol',
  BigInt = 'BigInt',

  // 函数类型
  Function = 'Function',
  AsyncFunction = 'AsyncFunction',
  GeneratorFunction = 'GeneratorFunction',
  AsyncGeneratorFunction = 'AsyncGeneratorFunction',

  // 对象类型
  Object = 'Object',
  Arguments = 'Arguments',
  Date = 'Date',
  RegExp = 'RegExp',

  // 错误类型
  Error = 'Error',
  EvalError = 'EvalError',
  RangeError = 'RangeError',
  ReferenceError = 'ReferenceError',
  SyntaxError = 'SyntaxError',
  TypeError = 'TypeError',
  URIError = 'URIError',

  // 集合类型
  Map = 'Map',
  Set = 'Set',
  WeakMap = 'WeakMap',
  WeakSet = 'WeakSet',

  // 二进制/缓冲类型
  ArrayBuffer = 'ArrayBuffer',
  SharedArrayBuffer = 'SharedArrayBuffer',
  DataView = 'DataView',
  Promise = 'Promise',

  // 数组类型
  Array = 'Array',

  // TypedArray 类型
  Int8Array = 'Int8Array',
  Uint8Array = 'Uint8Array',
  Uint8ClampedArray = 'Uint8ClampedArray',
  Int16Array = 'Int16Array',
  Uint16Array = 'Uint16Array',
  Int32Array = 'Int32Array',
  Uint32Array = 'Uint32Array',
  Float32Array = 'Float32Array',
  Float64Array = 'Float64Array',
  BigInt64Array = 'BigInt64Array',
  BigUint64Array = 'BigUint64Array',

  // 事件类型
  Event = 'Event',
  ErrorEvent = 'ErrorEvent',
  CustomEvent = 'CustomEvent'
}
