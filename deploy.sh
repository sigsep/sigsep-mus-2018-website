
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
aws s3 cp dist/ s3://sisec18 --recursive --acl public-read
