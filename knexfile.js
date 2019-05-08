// Update with your config settings.
//get rid of everything except development 

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3',
    },
    useNullAsDefault: true,
  },

  
};
