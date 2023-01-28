export interface Validation<T = any> {
  validate: (input: T) => null | Error
}
