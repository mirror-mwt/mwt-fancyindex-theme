### RStudio

RStudio does not provide official repositories. These repositories serve the latest official `.deb` and `.rpm` from RStudio. You can install the repo by running the following commands:

~~~sh
wget -qO- "https://mirror.mwt.me/rstudio/install.sh" | sudo -s
~~~

This script assumes you are on a distribution compatible with Debian 12 (e.g., Ubuntu Jammy) or Enterprise Linux 9. Versions for older distributions like focal or el8 can be found in the folders below. More complete installation instructions are available on [the mirrors page](https://www.matthewthom.as/mirrors/#rstudio) and in the [README for the project](https://github.com/mwt/rstudio-apt-repo/).
