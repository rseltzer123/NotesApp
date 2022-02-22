module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "rseltzer$0ccer42A",
    DB: "mynotes",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};