#!/bin/bash
# 导出不创建数据库和数据表
# mysqldump -u root -p'SQS' --force --no-create-db --no-create-info --databases ltpp > /home/LTPP/DockerData/Mysql/ltpp.sql;
mysqldump -u root -p'SQS' --force --databases ltpp > /home/LTPP/DockerData/Mysql/ltpp.sql;