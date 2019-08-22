(async () => {
  const prompts = require('prompts')
  const fs = require('fs')

  let webdriverArray = {};
  webdriverArray[1] = 'chrome'
  webdriverArray[2] = 'firefox'

  const questions = [
    {
      type: 'number',
      name: 'webdriver',
      message: 'Select a default webdriver: \n[1] - Chrome\n[2] - Firefox\n',
    },
    {
      type: 'text',
      name: 'email',
      message: `Enter your ServiceNow account's email address:`,
      initial: 'username@example.com'
    },
    {
      type: 'password',
      name: 'password',
      message: `Enter your ServiceNow account's email password:`,
      initial: '••••••'
    }
  ];

  const response = await prompts(questions);

  if (Object.keys(response).length === 3) {
    let str = `WEBDRIVER=${webdriverArray[response.webdriver]}\nEMAIL=${response.email}\nPASSWORD=${response.password}`
    fs.writeFile('.env', str, (err) => {
      if (err)
        throw err;
      
      console.log('\nNew config has been saved!')
    })
  } else{
    console.log("\nNo config has been saved. Please re-run the setup and try again.")
  }
})();