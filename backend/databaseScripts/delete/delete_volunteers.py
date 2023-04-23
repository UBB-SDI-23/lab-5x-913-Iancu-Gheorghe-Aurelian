#from databaseScripts.constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS, TLDS, EMAIL_DOMAINS
import mysql.connector


def delete_volunteers():
    conn = mysql.connector.connect(
            HOST="127.0.0.1",
            PORT=3306,
            DATABASE="animalshelter",
            USER="debian-sys-maint",
            PASSWORD="1ZKDyeEnwjHkFTIH"
        )

    try:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM volunteer;")
            conn.commit()
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()