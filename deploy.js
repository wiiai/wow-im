const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const Client = require('ssh2').Client;

const server = require('./ssh.config');
const spinner = ora({
  text: 'connecting sever...',
  color: 'cyan'
});

const connect = new Client();

/**
 * @description 连接服务器
 */
function conn(callback) {
  connect.on('ready', () => {
    spinner.succeed();
    callback && callback();
  });

  connect.on('error', err => {
    console.error(err);
    console.log(chalk.red('connect error.\n'));
  });

  connect.on('end', () => {
    console.log(chalk.cyan('connect end.\n'));
  });

  connect.on('close', err => {
    if (err) {
      console.log(err);
      console.log(chalk.red('connect closed.\n'));
    }
  });

  spinner.start('connect server...');
  connect.connect(server);
}
 
function run(callback) {
  const options = [
    {
      type: 'input',
      name: 'password',
      message: '密码',
      default: false
    }
  ];

  console.log(inquirer)

  inquirer
    .input(options)
    .then(res => {
      callback(res);
    })
    .catch(err => {
      console.log(err);
    });
}

function write () {
  connect.shell((err, stream) => {
    if (err) throw err;
    let buf = '';

    stream.on('close', err => {
      if (err) {
        console.error(err);
        return;
      }
      connect.end();
    });

    stream.on('data', data => {
      buf += data;
      console.log(data.toString());
    });

    stream.write(`cd /www/wwwroot/\n`);
    stream.write(`cd wow-im\n`);
    stream.write(`git pull\n`);
    stream.write(`git reset --hard origin/master\n`);
    stream.write(`cd server\n`);
    stream.write(`npm run pm2:restart\n`);
  });
}

// run((answer) => {
//   server.password = answer.password;
// })

conn(() => {
  write()
})