FROM mysql:8.0

# Magyar időzóna beállítása
ENV TZ=Europe/Budapest

# Másoljuk a konfigurációs fájlokat
COPY my.cnf /etc/mysql/conf.d/
COPY init.sql /docker-entrypoint-initdb.d/

# Állítsuk be a jogosultságokat
RUN chmod 644 /etc/mysql/conf.d/my.cnf

EXPOSE 3306

CMD ["mysqld"]