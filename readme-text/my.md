### RStudio

RStudio does not provide an official repository for Debian/Ubuntu. [This repository](https://github.com/mwt/rstudio-deb/) serves the latest official `.deb` from RStudio. All files are checked against the RStudio GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by running the following commands:

~~~sh
sudo wget -O /usr/share/keyrings/mwt.asc "https://mirror.mwt.me/my/gpgkey"
~~~

~~~sh
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/my/deb any rstudio" > /etc/apt/sources.list.d/rstudio.list'
~~~

This repository is the same as my Zoom repo (below). So, you can replace `any rstudio` in the string above with `any main` to get both.
