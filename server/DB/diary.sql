DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    entry_id INT GENERATED ALWAYS AS IDENTITY,
    entry_date DATE NOT NULL,
    entry_body VARCHAR(900) NOT NULL, 
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (entry_id)
);