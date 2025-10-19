# #!/bin/bash
# # Make sure we are on master
# git checkout master
# git pull origin master

# Build project
tsc
cp src/index.html build/
cp -r src/styles.css build/

# # Switch to gh-pages
# git checkout gh-pages
# git rm -rf *
# cp -r build/* .
#
# git add .
# git commit -m "Deploy updated site"
# git push origin gh-pages
#
# # Return to master
# git checkout master
