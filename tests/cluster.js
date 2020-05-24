const cluster = require('tests/cluster');

if (cluster.isMaster) {
  for (let i = 0; i < 2; i++) {
    let worker = cluster.fork();

    worker.on('disconnect', () => {
      console.log('断了');
    })

    worker.send({index: i});
  }
  console.log('主进程');
} else {
  console.log('子进程');

  process.on('message', (json) => {
    console.log(json);
  })
}
