FROM mongo

WORKDIR /mongo

COPY . .
RUN chmod +x dumpdb.sh
RUN chmod +x restoredb.sh
RUN apt-get update && apt-get install -y \
 cron \
 rsyslog

COPY dumpdb.cron /etc/cron.d/dump

CMD service rsyslog start && service cron start && tail -f /var/log/syslog
