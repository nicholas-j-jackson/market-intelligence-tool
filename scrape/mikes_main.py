import csv
import requests
from datetime import datetime

# enter path to where data will be saved
SavePath = ""

s = requests.session()

# get current date-time string
now = datetime.now()
dt_string = now.strftime("%m-%d-%Y__%H-%M")

# create name of csv file
csv_name = "Mike__" + dt_string + ".csv"

with open(csv_name, 'w', newline='') as file:
    fieldnames = ['store_id', 'number', 'address', 'city', 'state', 'zip', 'latitude', 'longitude', 'item', 'size', 'price']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()

    headers = {
        'authority': 'www.jerseymikes.com',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,es;q=0.8',
        'content-length': '0',
        'content-type': 'application/json;charset=utf-8',
        'cookie': '_gcl_au=1.1.845728263.1675907875; _gid=GA1.2.225400859.1675907877; _aeaid=75480bb6-17c8-4f3c-a64f-086501e4062f; aelastsite=Uuac6CAgsCALhHEWCPa6AV1Jr%2BRN6kZmkeWRLsh%2Fbx281MPEs69q9izSNfBuOdpc; HSIDSSL=S2; ga_events=%5B%7B%22clientId%22%3A%22678395879.1675907875%22%2C%22trackingId%22%3A%22UA-31802084-1%22%2C%22name%22%3A%22t0%22%7D%5D; ga_dl=%5B%7B%22clientId%22%3A%22678395879.1675907875%22%2C%22measurementId%22%3A%22G-H5LK8TJPNG%22%7D%5D; ga_gtm=%5B%7B%22clientId%22%3A%22678395879.1675907875%22%2C%22measurementId%22%3A%22G-H5LK8TJPNG%22%7D%5D; aelreadersettings=%7B%22c_big%22%3A0%2C%22rg%22%3A0%2C%22memph%22%3A0%2C%22contrast_setting%22%3A0%2C%22colorshift_setting%22%3A0%2C%22text_size_setting%22%3A0%2C%22space_setting%22%3A0%2C%22font_setting%22%3A0%2C%22k%22%3A0%2C%22k_disable_default%22%3A0%2C%22hlt%22%3A0%2C%22disable_animations%22%3A0%2C%22display_alt_desc%22%3A0%7D; aeatstartmessage=true; _gat=1; _uetsid=2b34f000a81d11edbf5a87b4553869ef; _uetvid=2b35c5f0a81d11ed90cff937d05ed26b; _ga=GA1.1.678395879.1675907875; XSRF-TOKEN=eyJpdiI6Im1wOWJ3b1VEWktCbzJ6VzQ3QXpCbVE9PSIsInZhbHVlIjoicVlSb1VWdW9cL2NKRXNjYzVrZ2RjaE13QjFYSG5ZcW1YRnpkWEtwOTdNTHVvS3NDbU1CUHhjT0M2SkhqbitXSEZOWjBDTUx0VXRxaGR4ZjVSK2lGc3J3PT0iLCJtYWMiOiIyMmEzZWQ0NjlmNzQ3MzdmN2U3MzJjNTlkNjE4MWFkNTM2MTY1YTMyZDUyNjY3MGMxMzcyYTFmOGE5ZDE1NzRlIn0%3D; session=eyJpdiI6IlpkUE5TNVAxb3ZzeFBNeXVqQ21YXC9BPT0iLCJ2YWx1ZSI6Ik5TcklPOWxrV0dwNVpmQ0pUTk5sSFQ0MWlidjFtRUw3cVZEVEJteGV5alhvR05Ra3VYYW45eGVicmY4bnROeGRhVkRcLzRnYnExcDRcL0pXK2Q5cXJZZ0E9PSIsIm1hYyI6IjcyNzNjZGU1OWI4YmUyZmNmZWQzMDIzMjhkOWY2ODY3ODIxYThhOGNjOWFjYjQ0NWI3ZjFjOWVmMDQyNGQyMWUifQ%3D%3D; _ga_YW2LRT2XJH=GS1.1.1675979838.3.1.1675979903.56.0.0; _ga_H5LK8TJPNG=GS1.1.1675979828.3.1.1675979904.54.0.0',
        'origin': 'https://www.jerseymikes.com',
        'referer': 'https://www.jerseymikes.com/order/13129/',
        'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36',
        'x-xsrf-token': 'eyJpdiI6IkxJcmJcLzRCYkZQTGFnVG5IVDBhTWZBPT0iLCJ2YWx1ZSI6IjM2SmxcL25IUkI3S3RRQ2krK1dGcEd6V01PaU14ZnU1WnpSTko3SnhLcEhReUxldjlZWkppMjNUN3JGbzUzbE10VktUVTJweW9NOWJMZzRjSW1MTmtUdz09IiwibWFjIjoiOTVkYjJiZmU2MDM3NzZlYzhlNjRmMTI2ZWY1ODM2MzE4YzFhOGQzZmY3MDdmYjg4YjA5MmExOGZmZWI1Mzc5MiJ9',
    }

    response = requests.post('https://www.jerseymikes.com/order/13129/data', headers=headers)
    data = response.json()

    if 'location' in data:
        store_id = data['location']['store_id']
        number = data['location']['number']
        address = data['location']['address1']
        city = data['location']['city']
        state = data['location']['state']['abbr']
        zipcode = data['location']['zip']
        latitude = data['location']['latitude']
        longitude = data['location']['longitude']

        for item in data['location']['products']:
            name = item['name']
            if 'sizes' in item:
                for subitem in item['sizes']:
                    size = subitem['name']
                    price = subitem['price']
                    if subitem['pickup']:
                        print(name + " " + size + " " + str(price))
                        writer.writerow({'store_id': store_id, 'number': number, 'address': address,
                                         'city': city, 'state': state, 'zip': zipcode, 'latitude': latitude,
                                         'longitude': longitude,
                                         'item': name, 'size': size, 'price': price})
            else:
                price = item['price']
                if item['pickup']:
                    print(name + " " + str(price))
                    writer.writerow({'store_id': store_id, 'number': number, 'address': address,
                                     'city': city, 'state': state, 'zip': zipcode, 'latitude': latitude,
                                     'longitude': longitude,
                                     'item': name, 'size': 'NA', 'price': price})
        for bundle in data['location']['product_groups']:
            name = bundle['name']
            price = bundle['price']
            if bundle['pickup']:
                print(name + " " + str(price))
                writer.writerow({'store_id': store_id, 'number': number, 'address': address,
                                 'city': city, 'state': state, 'zip': zipcode, 'latitude': latitude,
                                 'longitude': longitude,
                                 'item': name, 'size': 'NA', 'price': price})
