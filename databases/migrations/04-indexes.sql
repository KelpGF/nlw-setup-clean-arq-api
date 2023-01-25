CREATE UNIQUE INDEX habit_week_days_habit_id_week_day_key ON habit_week_days(habit_id, week_day);
CREATE INDEX days_date_idx ON days(date);
CREATE UNIQUE INDEX day_habits_day_id_habit_id_key ON day_habits(day_id, habit_id);
