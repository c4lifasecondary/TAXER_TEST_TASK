Привіт,

Завдання 1. https://docs.google.com/document/d/1F3uvdiqeV908clCj7YdnWOaZtAW8EtgVurVyxxPtrCY/edit?usp=sharing

Завдання 2.

Automation task build with:

js;

cypress;

cypress-each package;

cypress-file-upload package;

cypress-map package;

@lapo/asn1js package.

To setup on your machine:

Pull, install node

Run npm i

Run npx cypress open to firstly setup cypress

In order to run with cypress dashboard you can use: npm run open-test.

If you want use commandline use: npm run test.

Path to file with tests: /cypress/e2e/spec.cy.js

Video of test run: /cypress/videos/

Can be enchanced with mochawesome or other test reporter if needed...

Notes:

Тест проходить по списку сертифікатів, які знаходяться у папці fixtures. Наразі усі тести падають, так як у реалізації апп є помилка, яка описана в файлі. У тестах використовується індекс на правильний CommonName філд для Subject. Приклад даних в assert:

![Приклад](https://github.com/c4lifasecondary/TAXER_TEST_TASK/blob/master/cypress/screenshots/Приклад1.PNG?raw=true)

Thank you for your time <3!