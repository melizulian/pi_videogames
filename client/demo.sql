CREATE TABLE videogames (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    platforms VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    rating INT NOT NULL
);

CREATE TABLE genres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE videogames_genres (
    videogame_id UUID REFERENCES videogames(id),
    genre_id UUID REFERENCES genres(id),
    PRIMARY KEY (videogame_id, genre_id)
);