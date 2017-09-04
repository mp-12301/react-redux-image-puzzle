export default class FileReader {
  constructor() {
    this.event = {
      target: {
        result: "foobar",
      },
    };
  }
  readAsDataURL() {
    this.onload(this.event);
  }
}
