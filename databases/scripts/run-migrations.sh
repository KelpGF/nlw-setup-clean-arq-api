#!/usr/bin/env bash

mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" \
--execute="DROP DATABASE IF EXISTS $MYSQL_DATABASE; DROP DATABASE IF EXISTS $MYSQL_TESTS_DATABASE; DROP DATABASE IF EXISTS test;"

mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" \
--execute="CREATE DATABASE $MYSQL_DATABASE; CREATE DATABASE $MYSQL_TESTS_DATABASE; CREATE DATABASE test;"

mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" \
--execute="CREATE TABLE test.test (id int);"

for i in {30..0}; do
			if echo 'SELECT 1' | mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" &> /dev/null; then
				break
			fi
			echo 'MySQL init process in progress...'
			sleep 1
		done

for f in ./migrations/*.sql; do
	echo "$0: running $f"; mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < "$f"
	echo "$0: running $f"; mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_TESTS_DATABASE" < "$f"
  echo ""
  sleep 1
done