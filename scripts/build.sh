set -o errexit

# 当前路径
CURDIR=$(cd `dirname $0`; pwd)

# 先删除build目录
rm -rf build

# 构建server端代码 此为临时目录，由上一步产生
tsc -P src/tsconfig.json

cp package.json build/package.json
cp package-lock.json build/package-lock.json

cd build && npm install --production && cd ..