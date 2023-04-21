import random

import faker

from databaseScripts.constants import HOST, PORT, DATABASE, USER, PASSWORD, SPECIAL_CHARS, TLDS, EMAIL_DOMAINS, ANIMALS, BREEDS
import mysql.connector
from faker import Faker


def insert_data_animals():
    conn = mysql.connector.connect(
        host=HOST,
        port=PORT,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    try:
        with open("./queries/insert_animals.py", "w", encoding="utf-8") as f:
            fake = Faker("ro_Ro")
            with conn.cursor() as cursor:
                cursor.execute("SELECT shelter_id from shelter")
                shelter_ids = [el[0] for el in cursor.fetchall()]

                insert_query = "INSERT INTO animal (name, type, weight, breed, date_of_birth, shelter_animal_fk) VALUES "
                values = []
                for i in range(1000000):
                    name = fake.name()
                    type = random.choice(ANIMALS)
                    weight = round(random.uniform(10, 100), 2)
                    breed = random.choice(BREEDS)
                    year = random.randint(2008, 2023)
                    month = random.randint(1, 12)
                    day = random.randint(1, 28)
                    date_of_birth = f"{year}-{'{:02d}'.format(month)}-{'{:02d}'.format(day)}"

                    shelter_animal_fk = random.choice(shelter_ids)


                    values.append(
                        f"('{name}', '{type}', {weight}, '{breed}', '{date_of_birth}', {shelter_animal_fk})")

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