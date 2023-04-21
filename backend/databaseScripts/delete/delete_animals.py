from databaseScripts.constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS, TLDS, EMAIL_DOMAINS
import mysql.connector


def delete_animals():
    conn = mysql.connector.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM animal;")
            conn.commit()
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()