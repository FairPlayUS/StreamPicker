def recommend_movie(genre):
    recommended_movies = []
    
    if genre == "action":
        recommended_movies = ["The Dark Knight", "Mad Max: Fury Road", "Die Hard"]
    elif genre == "comedy":
        recommended_movies = ["Superbad", "The Hangover", "Bridesmaids"]
    elif genre == "sci-fi":
        recommended_movies = ["Blade Runner 2049", "Inception", "Interstellar"]
    else:
        recommended_movies = ["No recommendations for that genre"]
        
    return recommended_movies