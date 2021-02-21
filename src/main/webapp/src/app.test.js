import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import Redis from 'ioredis';

class TodosPage {
  constructor() {
    this.title = Selector("#react > section > header > h1");
    this.footer = Selector("footer.footer");
    this.footerInfo = Selector("#react > footer");
    this.toogleAllButton = Selector("label[for=toggle-all]");
    this.clearCompletedButton = Selector("button.clear-completed");
    this.toggleAllIsChecked = Selector("#toggle-all:checked");

    this.itemCount = () => {
      return Selector("ul.todo-list > li").count
    }

    this.completedItemCount = () => {
      return Selector("ul.todo-list > li input.toggle:checked").count
    }

    this.todoItem = (idx) => {
      return Selector(`ul.todo-list > li:nth-child(${idx})`)
    }

    this.todoItemIsChecked = (idx) => {
      return Selector(`ul.todo-list > li:nth-child(${idx}) input[type=checkbox].toggle:checked`).exists
    }

    this.deleteTodoItemButton = (idx) => {
      return Selector(`ul.todo-list > li:nth-child(${idx}) > div > button.destroy`)
    }

    this.todoItemToggle = (idx) => {
      return Selector(`ul.todo-list > li:nth-child(${idx}) input[type=checkbox].toggle`)
    }

    this.todoItemLabel = (idx) => {
      return Selector(`ul.todo-list > li:nth-child(${idx}) label`)
    }

    this.todoItemEdit = (idx) => {
      return Selector(`ul.todo-list > li:nth-child(${idx}) > input`)
    }
  }
}

const baseUrl = 'http://localhost:8080/';
const page = new TodosPage();

const TODO_ITEM_ONE = 'Wake up';
const TODO_ITEM_TWO = 'Fall out of bed';
const TODO_ITEM_THREE = 'Drag a comb across your head';

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


fixture('Some Todos')
  .page(baseUrl)
  .before(async t => {
    const redis = new Redis();
    await redis
      .pipeline()
      .hmset('com.redislabs.edu.todo.domain.Todo:1223737216530434668',
        {
          _class: 'com.redislabs.edu.todo.domain.Todo',
          id: '1223737216530434668',
          title: TODO_ITEM_ONE,
          completed: '0'
        })
      .hmset('com.redislabs.edu.todo.domain.Todo:6338784258919423326',
        {
          _class: 'com.redislabs.edu.todo.domain.Todo',
          id: '6338784258919423326',
          title: TODO_ITEM_TWO,
          completed: '0'
        })
      .hmset('com.redislabs.edu.todo.domain.Todo:-3136150315340919544',
        {
          _class: 'com.redislabs.edu.todo.domain.Todo',
          id: '-3136150315340919544',
          title: TODO_ITEM_THREE,
          completed: '0'
        })
      .sadd('com.redislabs.edu.todo.domain.Todo', ['1223737216530434668', '6338784258919423326', '-3136150315340919544'])
      .exec((err, results) => {});

    await redis.disconnect();
  });

test('should show all todos in the database', async t => {
  await t
    .expect(page.itemCount()).eql(3)
    .expect(page.todoItem(1).innerText).contains(TODO_ITEM_THREE)
    .expect(page.todoItem(2).innerText).contains(TODO_ITEM_ONE)
    .expect(page.todoItem(3).innerText).contains(TODO_ITEM_TWO);
});

test('should allow marking all items as completed', async t => {
  await t
    .click(page.toogleAllButton)
    .expect(page.todoItemIsChecked(1)).ok()
    .expect(page.todoItemIsChecked(2)).ok()
    .expect(page.todoItemIsChecked(3)).ok();
});

test('should correctly update the complete all checked state', async t => {
  await t
    .expect(page.toggleAllIsChecked.exists).ok();
});

test('should allow the deletion of an item', async t => {
  await t
    .expect(page.itemCount()).eql(3)
    .hover(page.todoItem(1))
    .click(page.deleteTodoItemButton(1))
    .expect(page.itemCount()).eql(2);
});

test('should hide other controls when editing', async t => {
  await t
    .doubleClick(page.todoItemLabel(1))
    .expect(page.todoItemToggle(1).visible).notOk()
    .expect(page.todoItemLabel(1).visible).notOk();
});

test('should exit edit mode on a second double click ', async t => {
  await t
    .doubleClick(page.todoItemLabel(1))
    .doubleClick(page.todoItemEdit(1))
    .expect(page.todoItemToggle(1).visible).ok()
    .expect(page.todoItemLabel(1).visible).ok();
});

test('should commit changes edits on return/enter', async t => {
  await t
    .doubleClick(page.todoItemLabel(1))
    .typeText(page.todoItemEdit(1), ' now!')
    .pressKey('enter')
    .expect(page.todoItemToggle(1).visible).ok()
    .expect(page.todoItemLabel(1).visible).ok()
    .expect(page.todoItem(1).innerText).contains('Wake up now!');
});