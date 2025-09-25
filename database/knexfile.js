module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename : './main.sqlite3'
        },
        useNullAsDefault : false,
        migrations :{
            directory : '../migrations'
        }

    }
}