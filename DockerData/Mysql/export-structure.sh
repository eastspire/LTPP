#!/bin/bash
mysqldump -u root -p'SQS' --force --no-data --databases ltpp > /home/LTPP/DockerData/Mysql/ltpp_structure.sql;