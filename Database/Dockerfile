FROM mysql:8.0

ENV TZ=Europe/Budapest

COPY my.cnf /etc/mysql/conf.d/
COPY init.sql /docker-entrypoint-initdb.d/

RUN chmod 644 /etc/mysql/conf.d/my.cnf

EXPOSE 3306

CMD ["mysqld"]