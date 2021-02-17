import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';

class TodosPage {
  constructor() {
    this.title = Selector("#react > section > header > h1");
    this.footer = Selector("footer.footer");
    this.footerInfo = Selector("#react > footer");
    this.toogleAllButton = Selector("label[for=toggle-all]");
    this.clearCompletedButton = Selector("button.clear-completed");

    this.itemCount = () => {
      return Selector("ul.todo-list > li").count
    }

    this.completedItemCount = () => {
      return Selector("ul.todo-list > li input.toggle:checked").count
    }
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

fixture('No Todos')
  .page(baseUrl)
  .beforeEach(async t => {
    const itemCount = await page.itemCount();
    const completedItemCount = await page.completedItemCount();
    if (itemCount > 0) {
      if (completedItemCount < itemCount) {
        await t.click(page.toogleAllButton)
      }
      await t.click(page.clearCompletedButton);
    }
  });

test('should hide #main and #footer', async t => {
  await t
    .expect(page.itemCount()).eql(0)
    .expect(page.footer.visible).notOk();
});