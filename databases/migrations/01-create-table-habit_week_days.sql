CREATE TABLE habit_week_days (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    habit_id int NOT NULL,
    week_day INTEGER NOT NULL,
    CONSTRAINT habit_week_days_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE CASCADE ON UPDATE CASCADE
);