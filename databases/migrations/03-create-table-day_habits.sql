CREATE TABLE day_habits (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day_id int NOT NULL,
    habit_id int NOT NULL,
    CONSTRAINT day_habits_day_id_fkey FOREIGN KEY (day_id) REFERENCES days (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT day_habits_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
