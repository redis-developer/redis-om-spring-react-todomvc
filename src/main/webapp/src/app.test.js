import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

class TodosPage {
  constructor() {
    this.title = Selector("#react > section > header > h1");
    this.footerInfo = Selector("#react > footer");
  }
}

const baseUrl = 'http://localhost:8080/';
const page = new TodosPage();

fixture('The home page').page(baseUrl);

test('should show the todos title', async t => {
  await t
    .expect(page.title.innerText).contains("todos");
});

test('should show the footer info', async t => {
  await t
    .expect(page.footerInfo.visible).ok();
});