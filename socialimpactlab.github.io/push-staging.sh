DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FOLDER=${PWD##*/}

mkdir ../_staging/
cp -r .git/ ../_staging/.git/
pushd ../_staging/
git fetch origin/gh-pages
git checkout gh-pages
#find . -path ./.git -prune -o -name '*' -delete
rsync -r --exclude='_staging/' --exclude='_site/' --exclude='CNAME' --exclude=".git" --exclude=".sass-cache" --exclude=".vscode/" --exclude="*.orig" $DIR ./
sed -i.bak 5s%.*%'baseurl: "/$FOLDER"'% _config.yml
rm _config.yml.bak
git add --all
git commit -am "update staging $(date "+%Y.%m.%d-%H.%M.%S") "
#git push 
#popd
#rm -rf ../_staging/