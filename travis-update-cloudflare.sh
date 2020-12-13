curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/purge_cache" \
     -H "Authorization: Bearer $CLOUDFLARE_AUTH_KEY" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'

echo "Cloudflare Cache Purged!"
