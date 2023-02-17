import csv
import requests
from datetime import datetime
import pandas as pd
import time

baseURL = "https://digitalservices-cdn.wendys.com/menu/"
startURL = "getSiteMenu?lang=en&cntry=US&sourceCode=ORDER.WENDYS&version=20.0.4&siteNum="
endURL = "&freeStyleMenu=true"

# enter path to BK address list here
AddressPath = "wendys.csv"

# enter path to where data will be saved
SavePath = ""

# open up list of restaurant addresses
data = pd.read_csv(AddressPath)
df = pd.DataFrame(data, columns=['store_number', 'address', 'city', 'state'])

s = requests.Session()

# get current date-time string
now = datetime.now()
dt_string = now.strftime("%m-%d-%Y__%H-%M")

# create name of csv file
csv_name = "Wendys__" + dt_string + ".csv"

with open(csv_name, 'w', newline='') as file:
    fieldnames = ['address', 'city', 'state', 'product', 'price']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

    for ind in df.index:
        stor_num = str(df['store_number'][ind]).strip()
        r = s.get(baseURL + startURL + stor_num + endURL)
        data = r.json()

        if 'menuLists' in data:
            for item in data['menuLists']['salesItems']:
                print(item['name'] + " $" + str(item['price']))
                writer.writerow(
                    {'address': df['address'][ind], 'city': df['city'][ind], 'state': df['state'][ind], 'product': item['name'], 'price': item['price']})
