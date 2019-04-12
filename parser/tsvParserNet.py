import csv
import json

allmovie_rated = {}
# Read all movies, and the rating
with open("../MovieAnalysis/user_ratedmovies-timestamps.dat", encoding="ISO-8859-1") as tsvfile:
    reader = csv.DictReader(tsvfile, dialect='excel-tab')
    for row in reader:
        movie_id = int(row['movieID'])
        movie_rating = float(row['rating'])
        if (movie_id in allmovie_rated):
            allmovie_rated[movie_id].append(movie_rating)
        else:
            allmovie_rated[movie_id] = []
            allmovie_rated[movie_id].append(movie_rating)
# print(allmovie_rated)

allmovie_averated = {}
# Calculate rating for each movie
for key, value in allmovie_rated.items():
    allrating = 0
    rating_num = 0
    averating = 0
    for rating in value:
        allrating += rating
        rating_num += 1
    if (rating_num != 0):
        averating = allrating/rating_num

    if(averating >= 5.0):
        averating = 5.0
    elif(averating >= 4.5):
        averating = 4.5
    elif(averating >= 4.0):
        averating = 4.0
    elif(averating >= 3.5):
        averating = 3.5
    elif(averating >= 3.0):
        averating = 3.0
    elif(averating >= 2.5):
        averating = 2.5
    elif(averating >= 2.0):
        averating = 2.0
    elif(averating >= 1.5):
        averating = 1.5
    elif(averating >= 1.0):
        averating = 1.0
    elif(averating >= 0.5):
        averating = 0.5
    elif(averating >= 0.0):
        averating = 0
    allmovie_averated[key] = averating
# print(allmovie_averated)
