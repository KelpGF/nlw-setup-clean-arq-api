CREATE TABLE habit_week_days (
    id varchar(255) NOT NULL PRIMARY KEY,
    habit_id varchar(255) NOT NULL,
    week_day INTEGER NOT NULL,
    CONSTRAINT habit_week_days_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE RESTRICT ON UPDATE CASCADE
);