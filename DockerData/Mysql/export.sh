#!/bin/bash
mysqldump -u root -p --force --no-create-db --no-create-info --databases ltpp > /home/LTPP/DockerData/Mysql/ltpp.sql;