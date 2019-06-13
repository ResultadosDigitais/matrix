#!/usr/bin/env bash
set -e
ENVFILE="/ENVS/variables"

echo "Running Entrypoint!"
if [[ -f $ENVFILE ]]
then 
  echo -n "read environment variables...: "
  source $ENVFILE  
  [[ $? -eq 0 ]] && echo "OK" || echo "Error"
fi

echo "Exec Args..."

exec $@
