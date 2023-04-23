import mysql.connector


def delete_animals():
    conn = mysql.connector.connect(
            HOST="127.0.0.1",
            PORT=3306,
            DATABASE="animalshelter",
            USER="debian-sys-maint",
            PASSWORD="1ZKDyeEnwjHkFTIH"
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