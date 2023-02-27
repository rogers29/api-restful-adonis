import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username')
      table.string('text')

      //Relacionamento de tabela ONE-TO-MANY (Um momento pode ter vários comentários, mas um comentário só pode ter um momento)
      //Parametro onDelete('CASCADE') significa que quando eu apagar um momento todos comentários serão apagados junto.

      table.integer('moment_id').unsigned().references('moments.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
