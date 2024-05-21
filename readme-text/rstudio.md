### RStudio

RStudio does not provide official repositories. These repositories serve the latest official `.deb` and `.rpm` from RStudio. You can install the repo by running the following commands:

```sh
wget -qO- "https://mirror.mwt.me/rstudio/install.sh" | sudo -s
```

This script assumes you are on the latest supported distribution. Currently, this includes Debian 12, Ubuntu Noble, Ubuntu Jammy, or Enterprise Linux 9.

For Debian-based distribution, we use Ubuntu codenames and do not update the codename when a new version is unnecessary. For example, Ubuntu 24.04 "Noble Numbat" uses the `jammy` repository because it works on this later release.

| Codename                                      | sources.list entry                                       |
| :-------------------------------------------- | :------------------------------------------------------- |
| [Ubuntu Noble Numbat](/rstudio/deb/jammy)     | `deb https://mirror.mwt.me/rstudio/deb/jammy jammy main` |
| [Ubuntu Jammy Jellyfish](/rstudio/deb/jammy)  | `deb https://mirror.mwt.me/rstudio/deb/jammy jammy main` |
| [Debian 12 "Bookworm"](/rstudio/deb/bookworm) | `deb https://mirror.mwt.me/rstudio/deb/jammy jammy main` |
| [Ubuntu Focal Fossa](/rstudio/deb/focal)      | `deb https://mirror.mwt.me/rstudio/deb/focal focal main` |
| [Debian 11 "Bullseye"](/rstudio/deb/focal)    | `deb https://mirror.mwt.me/rstudio/deb/focal focal main` |

{.table .table-sm .table-striped}

An [Enterprise Linux 8 version is also available here](/rstudio/rpm/el8/). More complete installation instructions are available on [the mirrors page](https://www.matthewthom.as/mirrors/#rstudio) and in the [README for the project](https://github.com/mwt/rstudio-apt-repo/).
