cd ui
rm -rf dist
npm run build
cd ../

cd web
rm -rf dist
npm run build
cd ../

cd server
rm -rf dist
rm -rf public
npm run build
cd ../

mkdir -p server/public/mobile
mkdir -p server/public/web

cp -R ui/dist/ server/public/mobile
cp -R ui/dist/ server/public/web

git add .
git commit -m "build"
git push