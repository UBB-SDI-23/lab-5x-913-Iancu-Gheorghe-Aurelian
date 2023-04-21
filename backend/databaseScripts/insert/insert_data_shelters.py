import random

from databaseScripts.constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS, TLDS, EMAIL_DOMAINS
import mysql.connector
from faker import Faker


def insert_data_shelters():
    conn = mysql.connector.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_shelters.py", "w", encoding="utf-8") as f:
            fake = Faker()
            with conn.cursor() as cursor:
                insert_query = "INSERT INTO shelter (name, address, number_of_volunteers, capacity, city, description) VALUES "
                values = []
                for i in range(1000000):
                    name = fake.company()
                    address = fake.street_address()
                    number_of_volunteers = random.randint(5, 300)
                    capacity = random.randint(20, 1500)
                    city = fake.city()
                    description = fake.paragraph(nb_sentences=5)
                    while len(description.split()) < 100:
                        description += " " + fake.paragraph(nb_sentences=5)
                    description = "".join(c for c in description if c not in ["'", ",", "-", "/"]).lower()
                    values.append(
                        f"('{name}', '{address}', {number_of_volunteers}, {capacity}, '{city}', '{description}')")
                    if len(values) == 1000:
                        #f.write(insert_query + ", ".join(values) + ";\n")
                        cursor.execute(insert_query + ", ".join(values))
                        values = []
                conn.commit()
    except Exception as error:
        print(error)
    finally:
        if conn:
            cursor.close()
            conn.close()