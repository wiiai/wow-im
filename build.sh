cd ui
rm -rf dist
npm run build
cd ../

cd server
rm -rf dist
rm -rf public
npm run build
cd ../

cp -R ui/dist/ server/public

git add .
git commit -m "build"
git push