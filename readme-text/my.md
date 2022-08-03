### RStudio

RStudio does not provide an official repository for Debian/Ubuntu. This repository serves the latest official `.deb` from RStudio. All files are checked against the RStudio GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by running the following commands:

~~~sh
wget -qO- "https://mirror.mwt.me/my/install.sh" | sudo sh
~~~

More complete installation instructions are available on [the mirrors page](https://www.matthewthom.as/mirrors/#rstudio) and in the [README for the project](https://github.com/mwt/rstudio-apt-repo/).
