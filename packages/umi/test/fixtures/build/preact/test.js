import { join } from 'path';
import { existsSync } from 'fs';

export default async function ({ page, host }) {
  //////////////////////////////
  // page /
  await page.goto(`${host}/#/`, { waitUntil: 'networkidle2' });
  const text = await page.evaluate(
    () => document.querySelector('h1').innerHTML,
  );
  expect(text).toEqual('index');

  const t1 = await page.evaluate(
    () => document.querySelector('h3').innerHTML,
  );
  expect(t1).toEqual('count: 0');

  await page.evaluate(() => document.querySelector('.increment').click());

  const t2 = await page.evaluate(
    () => document.querySelector('h3').innerHTML,
  );
  expect(t2).toEqual('count: 1');

  // antd
  const antdBtnLength = await page.evaluate(
    () => document.querySelectorAll('.ant-btn-primary').length,
  );
  expect(antdBtnLength).toEqual(1);

  // antd-mobile
  const amBtnLength = await page.evaluate(
    () => document.querySelectorAll('.am-button-primary').length,
  );
  expect(amBtnLength).toEqual(1);

  // hd
  const dataScale = await page.evaluate(
    () => document.documentElement.dataset.scale,
  );
  expect(dataScale).toEqual('true');

  // title
  const titleText = await page.evaluate(
    () => document.querySelector('title').innerHTML,
  );
  expect(titleText).toEqual('默认标题');

  // scripts
  const scripts = await page.evaluate(() => window.scripts);
  expect(scripts).toEqual(['headScript1', 'script1', 'script2']);

  // links
  const link = await page.evaluate(() =>
    document.querySelector('#link1').getAttribute('foo'),
  );
  expect(link).toEqual('bar');

  // metas
  const meta = await page.evaluate(() =>
    document.querySelector('#meta1').getAttribute('foo'),
  );
  expect(meta).toEqual('/bar');

  //////////////////////////////
  // page /a
  await page.goto(`${host}/#/a`, {
    waitUntil: 'networkidle2',
  });

  // title
  const pageATitleText = await page.evaluate(
    () => document.querySelector('title').innerHTML,
  );
  expect(pageATitleText).toEqual('标题测试');

  // check filepath in prod
  // $ -> _
  expect(existsSync(join(__dirname, 'dist', 'p___user.async.js'))).toEqual(true);
}
