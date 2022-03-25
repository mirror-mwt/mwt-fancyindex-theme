# Bootstrap Fancyindex
 
 My Nginx fancyindex theme made in Bootstrap. The useful output is in the `/dist` folder. You can generate this folder by running `build.sh`. The relevant configuration for nginx is the following.

```nginx
location / {
    fancyindex on;
    fancyindex_exact_size off;
    fancyindex_footer /fancyindex/footer.html; 
    fancyindex_header /fancyindex/header.html; 
    fancyindex_show_path off;
    fancyindex_time_format "%b %e, %Y";

    location /fancyindex {
        internal;
    }
}
```

For the above to work, you need two symbolic links. Suppose that your nginx root directory is `/var/www/html`. Then you want

```sh
NGINX_ROOT="/var/www/html"
REPO_DIR = $(pwd)

# (1) symlink for header and footer
sudo ln -s "$REPO_DIR/dist" $NGINX_ROOT/fancyindex
# (2) symlink for js/css
sudo ln -s "$REPO_DIR/dist/assets" $NGINX_ROOT/assets
```

This is designed to make the header and footer files inaccessible to users, but still allow the JavaScript and CSS to be loaded. It's simple to modify this theme to have just the first symlink and no internal directive.
