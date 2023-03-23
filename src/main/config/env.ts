export default {
  api_port: Number(process.env.API_PORT) || 3333,
  HABIT_CONTROL_DB_CONNECTION_STRING: process.env.HABIT_CONTROL_DB_CONNECTION_STRING || 'mysql://root:password@localhost:3306/habits_control',
  HABIT_CONTROL_TEST_DB_CONNECTION_STRING: process.env.HABIT_CONTROL_DB_CONNECTION_STRING || 'mysql://root:password@localhost:3306/habits_control_test'
}
