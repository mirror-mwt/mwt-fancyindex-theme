### RStudio

RStudio does not provide an official repository for Debian/Ubuntu. This repository serves the latest official `.deb` from RStudio. All files are checked against the RStudio GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by running the following commands:

~~~sh
sudo wget -O /usr/share/keyrings/mwt.asc "https://mirror.mwt.me/my/gpgkey"
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/my/deb any rstudio" | sudo tee /etc/apt/sources.list.d/mwt.list
~~~

More complete installation instructions are available on [the mirrors page](https://mattwthomas.com/mirrors/#rstudio) and in the [README for the project](https://github.com/mwt/rstudio-apt-repo/).
