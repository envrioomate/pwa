#!/usr/bin/env python
from pandas import DataFrame
#from sqlalchemy.engine import create_engine
import wget
import os.path
import datetime
import argparse
from dateutil.parser import parse as date_parse

def weeks(n): 
    day_offset = 7 * n
    return datetime.timedelta(days=day_offset)
def main():

 #   engine = create_engine('mysql://test:test@localhost/test')
 #   connecion = engine.connect()

    parser = argparse.ArgumentParser(description='Load all images and add dates.')
    parser.add_argument('start_date', help='startDate')

    args = parser.parse_args()

    startDate = date_parse(args.start_date)


    testDate = startDate + weeks(2)
    print(testDate)


    df = DataFrame.from_csv("data.tsv", sep="\t")
    df["start_date"] = ""
    df["end_date"] = ""
    for index, row in df.iterrows():
        df.at[index, 'start_date'] = str(startDate + weeks(index-1))
        df.at[index, 'end_date'] = str(startDate + weeks(index))
        fn = row['Titel'].replace(" ", "_") + '.jpg' #O_o
        url = row['Bild']
        print fn, url
        if isinstance(url, str): 
            try:
                path = './images/' + fn 
                if os.path.isfile(path):
                    print "File " + path + " already downloaded"
                else: 
                    wget.download(url, out=path)
                df.at[index, 'Bild'] = fn
            except:
                print "error downloading " + url + " for " + fn 
    df.to_csv("imgs.tsv" ,sep='\t')

if __name__ == "__main__":
    print("Running getImages")
    main()