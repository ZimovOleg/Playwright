const { test, expect } = require("@playwright/test");
const Values = require('./user.js');
const invalidValues = { mail: "zim@bk.ru", pass: "qwerty"};


test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 50000 });
  await expect(page.getByPlaceholder('Email')).toBeEnabled();
  const mailField = page.getByPlaceholder('Email');
  await mailField.fill(Values.mail);
  await mailField.press('Tab');
  const passField = page.getByPlaceholder('Пароль');
  await passField.fill(Values.pass);
  await passField.press('Enter');
  await expect(page.getByText('heading', { name: 'Мои курсы и профессии' })).toBeVisible();
});

test("Authorization error, invalid password", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", { timeout: 50000 });
  await expect(page.getByPlaceholder('Email')).toBeEnabled();
  const mailField = page.getByPlaceholder('Email');
  await mailField.fill(invalidValues.mail);
  await mailField.press('Tab');
  const passField = page.getByPlaceholder('Пароль');
  await passField.fill(invalidValues.pass);
  await passField.press('Enter');
  await expect(page.getByText("text=Вы ввели неправильно логин или пароль"))
  .toBeVisible;
  });