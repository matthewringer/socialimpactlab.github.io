mkdir ./_staging/
cp -r .git/ ./_staging/.git/
pushd ./_staging/
git checkout -f origin/gh-pages -b gh-pages
rsync -r --exclude='./_staging/' --exclude='./_site/' --exclude='CNAME' --exclude=".git" --exclude=".sass-cache" --exclude=".vscode/" --exclude="*.orig" ../ ./
sed -i.bak 5s%.*%'baseurl: "/socialimpactlab.github.io"'% _config.yml
rm _config.yml.bak
git add --all
git commit -am "update staging"
git push 
popd
rm -rf _staging/
