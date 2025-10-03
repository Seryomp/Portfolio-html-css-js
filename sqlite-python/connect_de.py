import sqlite3

database = 'account.db'
create_table = 'Account.info'

try:
    with sqlite3.connect(database) as conn:
        cursor = conn.cursor()
        cursor.execute(create_table)   
        conn.commit()

except sqlite3.OperationalError as e:
    print(e)