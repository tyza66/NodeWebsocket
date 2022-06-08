const { configProviderContextKey } = require('element-plus')
const ws = require('nodejs-websocket')

let UserCount = 0
//每次只要有用户连接，就会给连接的用户创建一个connect对象
const server = ws.createServer(connect => {
    console.log('有用户连接了')
    UserCount++
    connect.userName = 'User${count}'
    //每当有用户传递过来了数据，这个text事件就会被触发
    connect.on('text', data => {
        console.log(data);
        connect.send('我是收到的消息');
    })
    connect.on('close', () => {
        console.log('用户关闭连接');
        UserCount++
    })
    connect.on('error', () => {
        console.log('用户连接异常');
    })
})

function boardcast(msg) {
    server.connections.forEach(item => {
        item.send(msg);
    })
}

server.listen(3000, () => {
    console.log('websocket服务启动了，监听端口3000')
})