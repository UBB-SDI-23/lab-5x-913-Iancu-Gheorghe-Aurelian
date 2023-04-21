import random

from databaseScripts.constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS, TLDS, EMAIL_DOMAINS
import mysql.connector
from faker import Faker


def insert_data_volunteers():
    conn = mysql.connector.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_volunteers.py", "w", encoding="utf-8") as f:
            fake = Faker("ro_Ro")
            with conn.cursor() as cursor:
                insert_query = "INSERT INTO volunteer (first_name, last_name, email, phone, country) VALUES "
                values = []
                for i in range(1000000):
                    first_name = fake.first_name()
                    last_name = fake.last_name()
                    full_name = first_name + " " + last_name
                    name_modified = "".join(c for c in full_name if c not in SPECIAL_CHARS).lower()
                    email = name_modified + random.choice(EMAIL_DOMAINS)
                    phone = fake.phone_number()
                    phone = phone.replace(" ", "")
                    country = fake.country()
                    country_modified = "".join(c for c in country if c != "'")
                    values.append(f"('{first_name}', '{last_name}', '{email}', {phone}, '{country_modified}')")
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