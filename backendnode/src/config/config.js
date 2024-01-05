import 'dotenv/config'


  /*export const PORT = process.env.PORT ||3010;
  export const dbUser = process.env.DB_USER || 'user2023.MY2023';
  export const dbPassword = process.env.DB_PASSWORD || 3010;
  export const dbHost = process.env.DB_HOST || 'localhost';
  export const dbName = process.env.DB_NAME || 'libreria';
  export const dbPort = process.env.DB_PORT || 3309;*/

  export const config = {PORT:process.env.PORT || 3010,
    dbUser:process.env.DB_USER || 'userback',
    dbPassword:process.env.DB_PASSWORD || 'user2023.MY2023',
    dbHost:process.env.DB_HOST || 'localhost',
    dbName:process.env.DB_NAME || 'libreria',
    dbdockerPort:process.env.MYSQLDB_DOCKER_PORT || 3306,
    dbPort:process.env.DB_PORT || 3309,
    keyacces:process.env.KEYACCES}


