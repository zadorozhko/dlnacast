const dlnacast = require('./index');

describe("Helpers", () => {
    test('Detect valid url', () => {
        expect(dlnacast.isValidHttpUrl("http://example.com")).toBe(true);
        expect(dlnacast.isValidHttpUrl("https://192.168.0.1:32768/")).toBe(true);
        expect(dlnacast.isValidHttpUrl("MediaRenderer")).toBe(false);
    });
});

beforeAll(done => {
    done();
  })
  
afterAll(done => {
    // Closing the SMFS socket allows Jest to exit successfully.
    dlnacast.smfs.close();
    done();
  })