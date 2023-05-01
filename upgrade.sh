cd /home/ubuntu/projects/ahoms/api/oms-api;
git pull;
pm2 stop omsapi;
pm2 start npm --name omsapi -- start;
