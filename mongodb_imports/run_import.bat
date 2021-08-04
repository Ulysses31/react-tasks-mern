@echo off
cls
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=users --file=users.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=userroles --file=roles.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=states --file=states.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=priorities --file=priorities.json
mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=departments --file=departments.json

