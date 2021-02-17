import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

const baseUrl = 'http://localhost:8080/';

fixture('The home page').page(baseUrl);

test('should show Hello World', async t => {
  await t
    .expect(Selector("#react > h1").innerText).contains("Hello, world!");
});