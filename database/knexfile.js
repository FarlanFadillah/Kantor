module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename : './main.sqlite3',
            timezone : 'UTC'
        },
        useNullAsDefault : false,
        migrations :{
            directory : '../migrations'
        }

    }
}