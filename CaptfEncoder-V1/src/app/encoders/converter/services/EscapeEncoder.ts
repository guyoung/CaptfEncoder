export class EscapeEncoder {
  constructor(options) {
    options = options || {};
  }

  async handle(input) {
    if (!input || input.length < 1) {
      return "";
    }

    return escape(input);
  }
}
