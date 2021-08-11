@echo off
cls
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=users --file=users.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=userroles --file=roles.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=states --file=states.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=priorities --file=priorities.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=departments --file=departments.json
mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=computedurations --file=computedurations.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=projects --file=projects.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=tasks --file=tasks.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=comments --file=comments.json
REM mongoimport mongodb://localhost:27017 --drop --stopOnError --type=json --jsonArray --db=mycrm --collection=subtasks --file=subtasks.json

